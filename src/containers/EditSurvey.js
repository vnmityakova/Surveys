// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import { connect, Connector } from 'react-redux';
import {
  addNewQuestion,
  clearNewSurveyId,
  removeQuestion,
  changeSurveyTitle, getSurveyDataById, setQuestionsPerPage,
} from '../actions/survey';
import type { Dispatch } from '../types/index';
import Question from '../components/surveyConstructor/Question';
import QuestionConstructor from '../components/surveyConstructor/QuestionConstructor';

type OwnProps = {
  questions: [],
  location: Match;
  surveyParams: Object,
};

type OwnState = {
  question: string,
  questionType: string,
  answer: string,
  selectedQuestionType: string,
  questionsPerPage: string,
  surveyId: string,
  surveyName: string,
};

type DispatchProps = {
  getSurveyDataById: Function,
  addNewQuestion: Function,
  clearNewSurveyId: Function,
  removeQuestion: Function,
  changeSurveyTitle: Function,
};

type Props = OwnProps & DispatchProps;

class EditSurvey extends Component {
  props: Props;
  state: OwnState = {
    question: '',
    answer: '',
    surveyName: 'Опрос без названия',
    surveyId: this.props.match.params.id,
    selectedQuestionType: undefined,
    questionsPerPage: '1',
  };
  componentWillMount() {
    this.props.getSurveyDataById(this.state.surveyId);
    this.props.clearNewSurveyId();
  }

  render() {
    const { surveyName, questionsPerPage } = this.state;
    const { surveyParams } = this.props;
    return (
      <div className="editSurvey">

        <div className="surveyName">
          <input
            type="text"
            name="surveyName"
            placeholder="Название опроса"
            value={surveyParams.title || surveyName}
            onChange={this.handleNameChange}
            className="hoverInput"
          />
        </div>

        <div className="row">
          <label htmlFor="pageQuestionsNumber" className="col">Вопросов на странице:</label>
          <Select
            name="questions-number"
            value={surveyParams.questionsPerPage || questionsPerPage}
            className="questionsNumber col"
            onChange={this.handlePageQuestionsNumberSelect}
            clearable={false}
            searchable={false}
            options={[
              { value: '1', label: '1' },
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: 'all', label: 'все' },
            ]}
          />
        </div>

        <section className="addItem top10">

          <form>
            <input
              type="text"
              name="question"
              placeholder="Введите вопрос"
              onChange={this.handleChange}
              value={this.state.question}
              className="questionText"
            /><br />

            <Select
              name="selectedQuestionType"
              value={this.state.selectedQuestionType}
              className="questionTypesSelect top10"
              onChange={this.handleQuestionTypeSelect}
              placeholder="Выберите тип ответа"
              clearable={false}
              searchable={false}
              options={[
                { value: 'text', label: 'текст' },
                { value: 'radio', label: 'радиобатоны' },
                { value: 'checkbox', label: 'чекбоксы' },
                { value: 'date', label: 'дата' },
                { value: 'dropbox', label: 'выпадающий список' },
              ]}
            />

            <QuestionConstructor
              selectedQuestionType={this.state.selectedQuestionType}
              addQuestionAnswerItem={this.addQuestionAnswerItem}
            />

            <br />
            {/* <Button label="Добавить вопрос" raised onClick={this.handleAddQuestion} /> */}
          </form>
        </section>

        <section className="displayItem">
          <div className="wrapper">
            <ul>
              {this.props.questions.map((item, i) => {
                return (<Question
                  item={item}
                  removeQuestion={this.handleRemoveQuestion}
                  index={i + 1}
                />);
              })}
            </ul>
          </div>
        </section>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.changeSurveyTitle(this.state.surveyId, e.target.value);
  };

  handleRemoveQuestion = (questionId) => {
    this.props.removeQuestion(questionId, this.state.surveyId);
  };

  addQuestionAnswerItem = (item) => {
    const questionAnswerItem = {
      ...item,
      question: this.state.question,
    };
    this.setState({
      question: '',
      questionType: 'text',
    });
    this.props.addNewQuestion(questionAnswerItem, this.state.surveyId);
  };

  handleQuestionTypeSelect = (valueObj) => {
    this.setState({
      selectedQuestionType: valueObj.value,
    });
  };

  handlePageQuestionsNumberSelect = (valueObj) => {
    this.setState({
      pageQuestionsNumber: valueObj.value,
    });
    this.props.setQuestionsPerPage(valueObj.value, this.state.surveyId);
  };

}

const mapStateToProps = (state: State) => ({
  questions: state.layout.questions,
  surveyParams: state.layout.surveyParams,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getSurveyDataById: surveyId => dispatch(getSurveyDataById(surveyId)),
  addNewQuestion: (question, surveyId) => dispatch(addNewQuestion(question, surveyId)),
  clearNewSurveyId: () => dispatch(clearNewSurveyId()),
  removeQuestion: (questionId, surveyId) => dispatch(removeQuestion(questionId, surveyId)),
  changeSurveyTitle: (surveyId, title) => dispatch(changeSurveyTitle(surveyId, title)),
  setQuestionsPerPage: (number, surveyId) => dispatch(setQuestionsPerPage(number, surveyId)),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(EditSurvey));

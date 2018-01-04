// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import { Button } from 'react-toolbox/lib/button';
import { connect, Connector } from 'react-redux';
import { addNewQuestion, getQuestionsById, clearNewSurveyId } from '../actions/survey';
import type { Dispatch } from '../types/index';
import Question from '../components/Question';
import QuestionConstructor from "../components/QuestionConstructor";

type OwnProps = {
  questions: [],
  location: Match;
};

type OwnState = {
  question: string,
  questionType: string,
  answer: string,
  selectedQuestionType: string,
};

type DispatchProps = {
  getQuestions: Function,
  addNewQuestion: Function,
  clearNewSurveyId: Function,
  // removeQuestion: Function,
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
  };
  componentWillMount() {
    this.props.getQuestions(this.state.surveyId);
    this.props.clearNewSurveyId();
  }

  render() {
    return (
      <div className="editSurvey">

        <div className="surveyName">
          <input
            type="text"
            name="surveyName"
            placeholder="Название опроса"
            value={this.state.surveyName}
            onChange={this.handleChange}
            className="hoverInput"
          />
        </div>

        <div className="row">Вопросов на странице: 1</div>

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
              name="form-field-name"
              value={ this.state.selectedQuestionType }
              className="questionTypesSelect top10"
              onChange={ this.handleQuestionTypeSelect }
              placeholder="Выберите тип ответа"
              clearable={false}
              searchable={false}
              options={[
                { value: 'text', label: 'текст' },
                { value: 'radio', label: 'радиобатоны' },
                { value: 'checkbox', label: 'чекбоксы' },
                { value: 'date', label: 'дата' },
                { value: 'select', label: 'выпадающий список' },
              ]}
            />

            <QuestionConstructor
              selectedQuestionType={this.state.selectedQuestionType}
              addQuestionAnswerItem={this.addQuestionAnswerItem}
            />

            <br />
            {/*<Button label="Добавить вопрос" raised onClick={this.handleAddQuestion} />*/}
          </form>
        </section>

        <section className="displayItem">
          <div className="wrapper">
            <ul>
              {this.props.questions.map((item) => {
                return (<Question
                  item={item}
                  removeQuestion={this.props.removeQuestion}
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

  addQuestionAnswerItem = (item) => {
    const questionAnswerItem = {
      ...item,
      question: this.state.question,
    };
    this.setState({
      question: '',
      questionType: "text",
    });
    this.props.addNewQuestion(questionAnswerItem, this.state.surveyId);
  };

  handleQuestionTypeSelect = (event) => {
    const selectedType = event.value;
    this.setState({
      selectedQuestionType: selectedType,
    });
  };
}

const mapStateToProps = (state: State) => ({
  questions: state.layout.questions,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getQuestions: surveyId => dispatch(getQuestionsById(surveyId)),
  addNewQuestion: (question, surveyId) => dispatch(addNewQuestion(question, surveyId)),
  clearNewSurveyId: () => dispatch(clearNewSurveyId()),
  // removeQuestion: id => dispatch(removeQuestion(id)),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(EditSurvey));

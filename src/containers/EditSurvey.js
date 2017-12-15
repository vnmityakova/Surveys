// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, Connector } from 'react-redux';
import { addNewQuestion, getQuestionsById, clearNewSurveyId } from '../actions/survey';
import type { Dispatch } from '../types/index';
import Question from '../components/Question';

type OwnProps = {
  questions: [],
  location: Match;
};

type OwnState = {
  question: string,
  answer: string,
};

type DispatchProps = {
  getQuestions: Function,
  addNewQuestion: Function,
  clearNewSurveyId: Function,
  // removeQuestion: Function,
};

type Props = OwnProps & DispatchProps;

class CreateSurvey extends Component {
  props: Props;
  state: OwnState = {
    question: '',
    answer: '',
    surveyName: 'Опрос без названия',
    surveyId: this.props.match.params.id,
  };
  componentWillMount() {
    this.props.getQuestions(this.state.surveyId);
    this.props.clearNewSurveyId();
  }

  render() {
    return (
      <div className="container">

        <div>
          <input
            type="text"
            name="surveyName"
            placeholder="Название опроса"
            value={this.state.surveyName}
            onChange={this.handleChange}
          />
        </div>

        <section className="add-item">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="question"
              placeholder="Question?"
              onChange={this.handleChange}
              value={this.state.question}
            />
            <input
              type="text"
              name="answer"
              placeholder="Answer?"
              onChange={this.handleChange}
              value={this.state.answer}
            />
            <button>Add</button>
          </form>
        </section>

        <section className="display-item">
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

  handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      question: this.state.question,
      answer: this.state.answer,
    };
    this.setState({
      answer: '',
      question: '',
    });
    this.props.addNewQuestion(item, this.state.surveyId);
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

export default withRouter(connector(CreateSurvey));

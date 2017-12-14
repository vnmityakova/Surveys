// @flow
import React, { Component } from 'react';
import { connect, Connector } from 'react-redux';
import { getQuestions, addNewQuestion, removeQuestion } from '../actions/survey';
import type { Dispatch } from '../types/index';
import Question from '../components/Question';

type OwnProps = {
  questions: [],
};

type OwnState = {
  question: string,
  answer: string,
};

type DispatchProps = {
  getQuestions: Function,
  addNewQuestion: Function,
  removeQuestion: Function,
};

type Props = OwnProps & DispatchProps;

class CreateSurvey extends Component {
  props: Props;
  state: OwnState = {
    question: '',
    answer: '',
  };

  componentWillMount() {
    this.props.getQuestions();
  }

  render() {
    const defaulSurveyName = 'Опрос без названия';
    return (
      <div className="container">

        <div>
          <input type="text" value={defaulSurveyName} />
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
              name="answer"git init
              placeholder="Answer?"
              onChange={this.handleChange}
              value={this.state.answer}
            />
            <button onChange={this.handleChange}>Add</button>
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
    this.props.addNewQuestion(item);
  };
}

const mapStateToProps = (state: State) => ({
  questions: state.layout.questions,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getQuestions: () => dispatch(getQuestions()),
  addNewQuestion: question => dispatch(addNewQuestion(question)),
  removeQuestion: id => dispatch(removeQuestion(id)),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default connector(CreateSurvey);

// @flow
import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';

type Props = {
  surveyId: string,
  addNewQuestion: Function,
};

type OwnState = {
  question: string,
};

class QuestionAddBlock extends Component {
  props: Props;
  state: OwnState = {
    selectedQuestionType: undefined,
    question: '',
  };

  render() {
    return (
      <div className="top10 addItemParent">
        <section className="addItem">
          <textarea
            name="question"
            placeholder="Введите вопрос"
            onChange={this.handleChange}
            value={this.state.question}
            className="questionText"
          /><br />
          <Button className="top10" label="Добавить вопрос" raised primary onClick={this.handleAddQuestion} />
        </section>
        <div className="edge"></div>
      </div>
    );
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleAddQuestion = () => {
    const questionAnswerItem = {
      question: this.state.question,
      questionType: 'text',
    };
    this.setState({
      question: '',
    });
    this.props.addNewQuestion(questionAnswerItem, this.props.surveyId);
  }

}

export default QuestionAddBlock;

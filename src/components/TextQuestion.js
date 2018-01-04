// @flow
import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';

type Props = {
  addQuestionAnswerItem: Function,
}

type OwnState = {
  answer: string,
};

class TextQuestion extends Component {
  props: Props;
  state: OwnState = {
    answer: '',
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="answer"
          placeholder="Answer?"
          onChange={this.handleChange}
          value={this.state.answer}
        />
        <br />
        <Button className="top10" label="Добавить вопрос" raised onClick={this.handleAddQuestion} />
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddQuestion = () => {
    const item = {
      answer: this.state.answer,
      questionType: 'text',
    };
    this.setState({
      answer: '',
    });
    this.props.addQuestionAnswerItem(item);
  };

}

export default TextQuestion;

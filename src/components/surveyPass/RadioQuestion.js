// @flow
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import type { QuestionType } from '../../types/layout';

type Props = {
  question: QuestionType,
};

class TextQuestion extends Component { // eslint-disable-line
  props: Props;

  render() {
    const { question } = this.props.question;
    return (
      <div className="question">
        <div>{question}</div>
        <div><input type="text" /></div>
      </div>
    );
  }
}

export default TextQuestion;


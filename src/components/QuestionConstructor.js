// @flow
/* eslint-disable */
import React, { Component } from 'react';
import TextQuestion from './TextQuestion';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';

type Props = {
  selectedQuestionType: string,
  addQuestionAnswerItem: Function,
}

class QuestionConstructor extends Component {
  props: Props;
  render() {
    let el = null;
    const { selectedQuestionType } = this.props;
    if (selectedQuestionType === 'text') {
      el = <TextQuestion selectedQuestionType={selectedQuestionType} addQuestionAnswerItem={this.props.addQuestionAnswerItem} />;
    } else if (selectedQuestionType === 'radio') {
      el = <RadioQuestion selectedQuestionType={selectedQuestionType} addQuestionAnswerItem={this.props.addQuestionAnswerItem} />;
    } else if (selectedQuestionType === 'checkbox') {
      el = <CheckboxQuestion selectedQuestionType={selectedQuestionType} addQuestionAnswerItem={this.props.addQuestionAnswerItem} />;
    }
    return <div className="top10">{el}</div>;
  }
}

export default QuestionConstructor;

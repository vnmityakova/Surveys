// @flow
/* eslint-disable */
import React, { Component } from 'react';
import TextQuestion from './TextQuestion';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import { questionWithItems } from './questionWithItems';

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
      const RadioWithItems = questionWithItems(RadioQuestion, selectedQuestionType, this.props.addQuestionAnswerItem);
      el = <RadioWithItems />;
    } else if (selectedQuestionType === 'checkbox') {
      const CheckboxWithItems = questionWithItems(CheckboxQuestion, selectedQuestionType, this.props.addQuestionAnswerItem);
      el = <CheckboxWithItems />;
    }
    return <div className="top10">{el}</div>;
  }
}

export default QuestionConstructor;

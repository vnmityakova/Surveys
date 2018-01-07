// @flow
/* eslint-disable */
import React, { Component } from 'react';
import TextQuestion from './TextQuestion';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import { questionWithItems } from './questionWithItems';
import DateQuestion from "./DateQuestion";
import DropboxQuestion from './DropboxQuestion';

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
      el = <TextQuestion addQuestionAnswerItem={this.props.addQuestionAnswerItem} />;
    } else if (selectedQuestionType === 'radio') {
      const RadioWithItems = questionWithItems(RadioQuestion, selectedQuestionType, this.props.addQuestionAnswerItem);
      el = <RadioWithItems />;
    } else if (selectedQuestionType === 'checkbox') {
      const CheckboxWithItems = questionWithItems(CheckboxQuestion, selectedQuestionType, this.props.addQuestionAnswerItem);
      el = <CheckboxWithItems />;
    } else if(selectedQuestionType === 'date'){
      el = <DateQuestion addQuestionAnswerItem={this.props.addQuestionAnswerItem}/>
    } else if(selectedQuestionType === 'dropbox'){
      const DropboxWithItems = questionWithItems(DropboxQuestion, selectedQuestionType, this.props.addQuestionAnswerItem);
      el = <DropboxWithItems />;
    }
    return <div className="top10">{el}</div>;
  }
}

export default QuestionConstructor;

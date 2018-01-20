// @flow
import React, { Component } from 'react';
import TextQuestionEdit from './TextQuestionEdit';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import { questionWithItems } from './questionWithItems';
import DateQuestion from './DateQuestion';
import DropboxQuestion from './DropboxQuestion';

type Props = {
  selectedQuestionType: string,
}

class QuestionEditConstructor extends Component {
  props: Props;
  el: any;

  constructor(props: Props) {
    super(props);
    const { selectedQuestionType } = props;
    this.el = this.getHOC(selectedQuestionType);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { selectedQuestionType } = nextProps;

    if (this.props.selectedQuestionType !== selectedQuestionType) {
      this.el = this.getHOC(selectedQuestionType);
    }
  }

  render() {
    return <div className="top10 questionEditConstructor"><this.el /></div>;
  }

  getHOC = (selectedQuestionType) => {
    let el = null;
    if (selectedQuestionType === 'text') {
      el = TextQuestionEdit;
    } else if (selectedQuestionType === 'radio') {
      el = questionWithItems(RadioQuestion);
    } else if (selectedQuestionType === 'checkbox') {
      el = questionWithItems(CheckboxQuestion);
    } else if (selectedQuestionType === 'date') {
      el = DateQuestion;
    } else if (selectedQuestionType === 'dropbox') {
      el = questionWithItems(DropboxQuestion);
    }
    return el;
  }

}

export default QuestionEditConstructor;

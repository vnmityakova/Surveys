// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import type { QuestionType } from '../../types/layout';

type Props = {
  children: any,
  item: QuestionType,
  removeQuestion: Function,
  setIsEdit: Function,
  surveyId: string,
};

type OwnState = {
};

class QuestionViewerCommon extends Component {
  props: Props;
  state: OwnState = {
  };

  handleRemove = () => {
    const questionId = this.props.item.id;
    this.props.removeQuestion(questionId, this.props.surveyId);
  };

  handleEdit = () => {
    this.props.setIsEdit();
  };

  render() {
    const { item } = this.props;
    return (
      <li key={item.id} className="question">
        <h3>{item.index}. {item.question}</h3>
          {this.props.children}
        <Button
          label="Remove"
          raised
          onClick={this.handleRemove}
        />
        <Button
          label="Edit"
          raised
          onClick={this.handleEdit}
          className="top10"
        />
      </li>
    );
  }
}

export default QuestionViewerCommon;

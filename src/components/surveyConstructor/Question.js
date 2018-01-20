// @flow
import React, { Component } from 'react';
import { connect, Connector } from 'react-redux';
import QuestionEditBlock from './QuestionEditBlock';
import QuestionViewBlock from './QuestionViewBlock';
import type { QuestionType } from '../../types/layout';

type OwnProps = {
  item: Object,
};

type DispatchProps = {
  editingQuestion: QuestionType,
};

type Props = OwnProps & DispatchProps;

class Question extends Component { // eslint-disable-line
  props: Props;

  render() {
    const { item, editingQuestion } = this.props;
    const isEditing = editingQuestion && editingQuestion.id === item.id;
    if (isEditing) {
      return <QuestionEditBlock />;
    }
    return (
      <QuestionViewBlock item={item} />
    );
  }

}

const mapStateToProps = (state: State) => ({
  editingQuestion: state.layout.editingQuestion,
});

const connector: Connector<OwnProps, {}> = connect(mapStateToProps, null);

export default connector(Question);

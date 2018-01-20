// @flow
import React, { Component } from 'react';
import { connect, Connector } from 'react-redux';
import { clone, last, remove, sortBy, find } from 'lodash';
import type { Dispatch, State } from '../../types';
import { changeQuestion } from '../../actions/survey';
import type { QuestionType } from '../../types/layout';

type Props = {
  editingQuestion: QuestionType,
  onChangeQuestion: Function,
}

export function questionWithItems(WrappedComponent) {
  class QuestionWithItems extends Component {
    props: Props;

    componentDidMount() {
      if (!this.props.editingQuestion.answers) {
        const { id } = this.props.editingQuestion;
        this.props.onChangeQuestion(id, {
          answers: [
            {
              id: 0,
              text: '',
            },
            {
              id: 1,
              text: '',
            },
          ],
        });
      }
    }

    render() {
      return (<WrappedComponent
        editingQuestion={this.props.editingQuestion}
        handleAddAnswerItem={this.handleAddAnswerItem}
        removeItem={this.removeItem}
        changeAnswer={this.changeAnswer}
        key={this.props.editingQuestion.id}
      />);
    }

    handleAddAnswerItem = () => {
      const { answers, id } = this.props.editingQuestion;
      const newAnswerItems = clone(answers);
      sortBy(newAnswerItems, 'id');
      newAnswerItems.push({
        id: last(newAnswerItems).id + 1,
        text: '',
      });
      this.props.onChangeQuestion(id, {
        answers: newAnswerItems,
      });
    };

    changeAnswer = (id, value) => {
      const { answers } = this.props.editingQuestion;
      const newAnswerItems = clone(answers);
      const itemToChange = find(newAnswerItems, (item, i) => (
        i === id
      ));
      itemToChange.value = value;
      this.props.onChangeQuestion(id, {
        answers: newAnswerItems,
      });
    };

    removeItem = (id) => {
      const { answers } = this.props.editingQuestion;
      const newAnswerItems = clone(answers);
      remove(newAnswerItems, (item, i) => (
        i === id
      ));
      this.props.onChangeQuestion(id, {
        answers: newAnswerItems,
      });
    };

  }

  const mapStateToProps = (state: State) => {
    return {
      editingQuestion: state.layout.editingQuestion,
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    onChangeQuestion: (questionId, questionObj) => dispatch(changeQuestion(questionId, questionObj)),
  });

  const connector: Connector = connect(mapStateToProps, mapDispatchToProps);

  return connector(QuestionWithItems);
}

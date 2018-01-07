// @flow
import React, { Component } from 'react';
import { clone, last, map, remove, sortBy, find } from 'lodash';

type OwnState = {
  answerItems: Array,
};

export function questionWithItems(WrappedComponent, questionType, addQuestionAnswerItem) {
  return class extends Component {
    defaultState: OwnState = {
      answerItems: [
        {
          id: 0,
          text: '',
        },
        {
          id: 1,
          text: '',
        },
      ],
    };
    state: OwnState = this.defaultState;
    render() {
      return (<WrappedComponent
        answerItems={this.state.answerItems}
        handleAddAnswerItem={this.handleAddAnswerItem}
        handleAddQuestion={this.handleAddQuestion}
        removeItem={this.removeItem}
        changeAnswer={this.changeAnswer}
      />);
    }

    handleAddAnswerItem = () => {
      const newAnswerItems = clone(this.state.answerItems);
      sortBy(newAnswerItems, 'id');
      newAnswerItems.push({
        id: last(newAnswerItems).id + 1,
        text: '',
      });
      this.setState({
        answerItems: newAnswerItems,
      });
    };

    handleAddQuestion = () => {
      const answerList = map(this.state.answerItems, item => (
        {
          value: item.text,
        }
      ));

      const item = {
        answer: answerList,
        questionType,
      };
      addQuestionAnswerItem(item);
      this.setState(this.defaultState);
    };

    changeAnswer = (id, value) => {
      const newAnswerItems = clone(this.state.answerItems);
      const itemToChange = find(newAnswerItems, item => (
        item.id === id
      ));
      itemToChange.text = value;
      this.setState({
        answerItems: newAnswerItems,
      });
    };

    removeItem = (id) => {
      const newAnswerItems = clone(this.state.answerItems);
      remove(newAnswerItems, item => (
        item.id === id
      ));
      this.setState({
        answerItems: newAnswerItems,
      });
    }

  };
}

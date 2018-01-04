// @flow
import React, { Component } from 'react';
import { RadioGroup } from 'react-toolbox/lib/radio';
import { Button } from 'react-toolbox/lib/button';
import { clone, map, remove, sortBy, last } from 'lodash';
import RadioItem from './RadioItem';

type Props = {
  addQuestionAnswerItem: Function,
}

type OwnState = {
  answerItems: Array,
};

class RadioQuestion extends Component {
  props: Props;
  defaultState: OwnState = {
    answerItems: [
      {
        id: 0,
        text: 'вариант ответа1',
      },
      {
        id: 1,
        text: 'вариант ответа2',
      },
    ],
  };
  state: OwnState = this.defaultState;

  render() {
    const { answerItems } = this.state;
    const radioboxes = map(answerItems, (item) => {
      const isRemovable = answerItems.length > 2;
      return (
        <RadioItem
          id={item.id}
          answer={item.text}
          removeItem={this.removeItem}
          key={`item-${item.id}`}
          changeAnswer={this.changeAnswer}
          isRemovable={isRemovable}
        />
      );
    });
    return (
      <div className="radioQuestion">
        <Button label="+" raised onClick={this.handleAddAnswerItem} className="addItemButton" /><br />
        <RadioGroup name="radioQuestion" value={this.state.value} className="top10">
          {radioboxes}
        </RadioGroup>
        <br />
        <Button label="Добавить вопрос" raised onClick={this.handleAddQuestion} />
      </div>
    );
  }

  handleAddAnswerItem = () => {
    const newAnswerItems = clone(this.state.answerItems);
    sortBy(newAnswerItems, 'id');
    newAnswerItems.push({
      id: last(newAnswerItems).id + 1,
      text: 'вариант ответа',
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
      questionType: 'radio',
    };
    this.props.addQuestionAnswerItem(item);
    this.setState(this.defaultState);
  };

  changeAnswer = (id, value) => {
    const newAnswerItems = clone(this.state.answerItems);
    newAnswerItems[id].text = value;
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

}

export default RadioQuestion;

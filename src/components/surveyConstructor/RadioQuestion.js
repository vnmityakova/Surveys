// @flow
/* eslint-disable */
import React from 'react';
import { RadioGroup } from 'react-toolbox/lib/radio';
import { Button } from 'react-toolbox/lib/button';
import {clone, find, last, map, remove, sortBy} from 'lodash';
import RadioItem from './RadioItem';
import type {QuestionType} from "../../types/layout";

/* type DispatchProps = {
  editingQuestion: Question,
  onChangeQuestion: Function,
  handleAddAnswerItem
} */

type Props = {
  editingQuestion: QuestionType,
  handleAddAnswerItem: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const RadioQuestion = (props: Props) => {
  const { answers } = props.editingQuestion;
  const { removeItem, changeAnswer, handleAddAnswerItem } = props;
  /* const handleAddAnswerItem = () => {
    const newAnswerItems = clone(answer);
    sortBy(newAnswerItems, 'id');
    newAnswerItems.push({
      id: last(newAnswerItems).id + 1,
      text: '',
    });
    props.onChangeQuestion(id, {
      answerItems: newAnswerItems,
    });
  };

  const removeItem = (id) => {
    const newAnswerItems = clone(answer);
    remove(newAnswerItems, item => (
      item.id === id
    ));
    props.onChangeQuestion(id, {
      answerItems: newAnswerItems,
    });
  };

  const changeAnswer = (id, value) => {
    const newAnswerItems = clone(answer);
    const itemToChange = find(newAnswerItems, item => (
      item.id === id
    ));
    itemToChange.text = value;
    props.onChangeQuestion(id, {
      answerItems: newAnswerItems,
    });
  }; */

  const radioboxes = map(answers, (item, i) => {
    const isRemovable = answers.length > 2;
    return (
      <RadioItem
        id={i}
        answer={item.value}
        removeItem={removeItem}
        key={`item-${i}`}
        changeAnswer={changeAnswer}
        isRemovable={isRemovable}
      />
    );
  });

  return (
    <div className="radioQuestion">
      <Button label="+" raised onClick={handleAddAnswerItem} className="addItemButton" /><br />
      <RadioGroup name="radioQuestion" className="top10">
        {radioboxes}
      </RadioGroup>
    </div>
  );
};

/* const mapStateToProps = (state: State) => {
  return {
    editingQuestion: state.layout.editingQuestion,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChangeQuestion: (questionId, questionObj) => dispatch(changeQuestion(questionId, questionObj)),
});

const connector: Connector<State, DispatchProps> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(RadioQuestion)); */

export default RadioQuestion;

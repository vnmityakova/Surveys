// @flow
/* eslint-disable */
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { map } from 'lodash';
import CheckboxItem from './CheckboxItem';
import type {QuestionType} from "../../types/layout";

type Props = {
  editingQuestion: QuestionType,
  handleAddAnswerItem: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const CheckboxQuestion = (props: Props) => {
  const { answers } = props.editingQuestion;
  const { removeItem, changeAnswer, handleAddAnswerItem } = props;

  const checkboxes = map(answers, (item, i) => {
    const isRemovable = answers.length > 2;
    return (
      <CheckboxItem
        id={i}
        answer={item.value}
        removeItem={removeItem}
        key={`item-${i}`}
        changeAnswer={changeAnswer}
        isRemovable={isRemovable}
      />);
  });
  return (
    <div className="checkboxQuestion">
      <Button label="+" raised onClick={handleAddAnswerItem} className="addItemButton" /><br />
      <div className="top10">{checkboxes}</div>
    </div>
  );
};

export default CheckboxQuestion;

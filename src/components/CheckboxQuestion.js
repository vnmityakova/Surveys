// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { map } from 'lodash';
import CheckboxItem from './CheckboxItem';

type Props = {
  answerItems: Array,
  handleAddAnswerItem: Function,
  handleAddQuestion: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const CheckboxQuestion = (props: Props) => {
  const { answerItems, handleAddAnswerItem, handleAddQuestion, removeItem, changeAnswer } = props;
  const checkboxes = map(answerItems, (item) => {
    const isRemovable = answerItems.length > 2;
    return (
      <CheckboxItem
        id={item.id}
        answer={item.text}
        removeItem={removeItem}
        key={`item-${item.id}`}
        changeAnswer={changeAnswer}
        isRemovable={isRemovable}
      />);
  });
  return (
    <div className="checkboxQuestion">
      <Button label="+" raised onClick={handleAddAnswerItem} className="addItemButton" /><br />
      <div className="top10">{checkboxes}</div>
      <Button className="top10" label="Добавить вопрос" raised onClick={handleAddQuestion} />
    </div>
  );
};

export default CheckboxQuestion;

// @flow
import React from 'react';
import { RadioGroup } from 'react-toolbox/lib/radio';
import { Button } from 'react-toolbox/lib/button';
import { map } from 'lodash';
import RadioItem from './RadioItem';

type Props = {
  answerItems: Array,
  handleAddAnswerItem: Function,
  handleAddQuestion: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const RadioQuestion = (props: Props) => {
  const { answerItems, handleAddAnswerItem, handleAddQuestion, removeItem, changeAnswer } = props;
  const radioboxes = map(answerItems, (item) => {
    const isRemovable = answerItems.length > 2;
    return (
      <RadioItem
        id={item.id}
        answer={item.text}
        removeItem={removeItem}
        key={`item-${item.id}`}
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
      <br />
      <Button label="Добавить вопрос" raised onClick={handleAddQuestion} />
    </div>
  );
};

export default RadioQuestion;

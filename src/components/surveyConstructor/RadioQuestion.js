// @flow
import React from 'react';
import { RadioGroup } from 'react-toolbox/lib/radio';
import { Button } from 'react-toolbox/lib/button';
import { map } from 'lodash';
import RadioItem from './RadioItem';
import type { QuestionType } from '../../types/layout';

type Props = {
  editingQuestion: QuestionType,
  handleAddAnswerItem: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const RadioQuestion = (props: Props) => {
  const { answers } = props.editingQuestion;
  const { removeItem, changeAnswer, handleAddAnswerItem } = props;

  const radioboxes = map(answers, (item, i) => {
    const isRemovable = answers.length > 2;
    return (
      <RadioItem
        id={i}
        answer={item.value || ''}
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

export default RadioQuestion;

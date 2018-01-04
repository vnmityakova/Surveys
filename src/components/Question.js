// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Checkbox from 'react-toolbox/lib/checkbox';

type Props = {
  item: Object,
  // removeQuestion: Function,
};

const Question = (props: Props) => {
  const item = props.item;

  const handleRemove = () => {
    const itemId = props.item.id;
    props.removeQuestion(itemId);
  };
  if (item.questionType === 'text') {
    return (
      <li key={item.id} className="question">
        <h3>{item.question}</h3>
        <p>{item.answer} <input type="text" disabled /></p>
        <Button
          label="Remove"
          raised
          onClick={handleRemove}
        />
      </li>
    );
  } else if (item.questionType === 'radio') {
    const radioList = item.answer.map(answer => (
      <RadioButton label={answer.value} value={answer.value} disabled />
      )
    );
    return (
      <li key={item.id} className="question">
        <h3>{item.question}</h3>
        <RadioGroup name="comic">
          {radioList}
        </RadioGroup>
        <Button
          label="Remove"
          raised
          onClick={handleRemove}
        />
      </li>
    );
  } else if (item.questionType === 'checkbox') {
    const checkboxes = item.answer.map(answer => (
      <Checkbox label={answer.value} disabled />
      )
    );
    return (
      <li key={item.id} className="question">
        <h3>{item.question}</h3>
        {checkboxes}
        <Button
          label="Remove"
          raised
          onClick={handleRemove}
        />
      </li>
    );
  }
  return null;
};

export default Question;

// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';

type Props = {
  item: Object,
  removeQuestion: Function,
};

const Question = (props: Props) => {
  const item = props.item;

  const handleRemove = () => {
    const itemId = props.item.id;
    props.removeQuestion(itemId);
  };

  return (
    <li key={item.id}>
      <h3>{item.question}</h3>
      <p>answer: {item.answer}</p>
      <Button
        label="Remove"
        raised
        onClick={handleRemove}
      />
    </li>
  );
};

export default Question;

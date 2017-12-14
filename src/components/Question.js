// @flow
import React from 'react';

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
      <button onClick={handleRemove}>Remove</button>
    </li>
  );
};

export default Question;

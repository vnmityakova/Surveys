// @flow
import React from 'react';
import Select from 'react-select';
import { Button } from 'react-toolbox/lib/button';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Checkbox from 'react-toolbox/lib/checkbox';

type Props = {
  item: Object,
  removeQuestion: Function, //eslint-disable-line
  index: number,
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
        <h3>{props.index}. {item.question}</h3>
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
        <h3>{props.index}. {item.question}</h3>
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
        <h3>{props.index}. {item.question}</h3>
        {checkboxes}
        <Button
          label="Remove"
          raised
          onClick={handleRemove}
        />
      </li>
    );
  } else if (item.questionType === 'dropbox') {
    const items = item.answer.map(answer => (
      {
        value: answer.value,
        label: answer.value,
      }
      )
    );
    return (
      <li key={item.id} className="question">
        <h3>{props.index}. {item.question}</h3>
        <Select
          name="form-field-name"
          value={''}
          className="questionTypesSelect top10"
          // onChange={this.handleQuestionTypeSelect}
          placeholder="Выберите тип ответа"
          clearable={false}
          searchable={false}
          options={items}
        />
        <Button
          label="Remove"
          raised
          onClick={handleRemove}
          className="top10"
        />
      </li>
    );
  }
  return null;
};

export default Question;

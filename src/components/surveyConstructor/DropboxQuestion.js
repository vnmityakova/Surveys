// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import Select from 'react-select';
import { map } from 'lodash';
import DropboxItem from './DropboxItem';

type Props = {
  answerItems: Array,
  handleAddAnswerItem: Function,
  handleAddQuestion: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const SelectQuestion = (props: Props) => {
  const { answerItems, handleAddAnswerItem, handleAddQuestion, removeItem, changeAnswer } = props;
  const dropboxItems = map(answerItems, (item) => {
    const isRemovable = answerItems.length > 2;
    return (
      <DropboxItem
        id={item.id}
        answer={item.text}
        removeItem={removeItem}
        key={`item-${item.id}`}
        changeAnswer={changeAnswer}
        isRemovable={isRemovable}
      />);
  });
  return (
    <div className="selectQuestion">
      <div className="row selectAddRow">
        <Select
          name="form-field-name"
          value=""
          className="dropboxSelect col"
          placeholder="Выберите..."
          clearable={false}
          searchable={false}
          options={[]}
          disabled
        />
        <Button label="+" raised onClick={handleAddAnswerItem} className="addItemButton col" />
      </div>
      <div>{dropboxItems}</div>
      <Button className="top10" label="Добавить вопрос" raised onClick={handleAddQuestion} />
    </div>
  );
};

export default SelectQuestion;

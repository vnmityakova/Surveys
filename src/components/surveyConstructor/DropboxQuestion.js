// @flow
import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import Select from 'react-select';
import { map } from 'lodash';
import DropboxItem from './DropboxItem';
import type { QuestionType } from '../../types/layout';

type Props = {
  editingQuestion: QuestionType,
  handleAddAnswerItem: Function,
  removeItem: Function,
  changeAnswer: Function,
}

const SelectQuestion = (props: Props) => {
  const { answers } = props.editingQuestion;
  const { removeItem, changeAnswer, handleAddAnswerItem } = props;

  const dropboxItems = map(answers, (item, i) => {
    const isRemovable = answers.length > 2;
    return (
      <DropboxItem
        id={i}
        answer={item.value}
        removeItem={removeItem}
        key={`item-${i}`}
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
    </div>
  );
};

export default SelectQuestion;

// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import { Button } from 'react-toolbox/lib/button';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Checkbox from 'react-toolbox/lib/checkbox';

type Props = {
  item: Object,
  removeQuestion: Function,
  index: number,
};

type OwnState = {
  isEditing: boolean,
};

class Question extends Component {
  props: Props;
  state: OwnState = {
    isEditing: false,
  };

  render() {
    const item = this.props.item;

    const handleRemove = () => {
      const itemId = this.props.item.id;
      this.props.removeQuestion(itemId);
    };

    const handleEdit = () => {
      this.setState({
        isEditing: true,
      });
    };

    if (item.questionType === 'text') {
      /* if (this.state.isEditing) {
        return (<div>edit</div>);
      } */
      return (
        <li key={item.id} className="question">
          <h3>{this.props.index}. {item.question}</h3>
          <p><input type="text" disabled /></p>
          <Button
            label="Remove"
            raised
            onClick={handleRemove}
          />
          <Button
            label="Edit"
            raised
            onClick={handleEdit}
            className="top10"
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
          <h3>{this.props.index}. {item.question}</h3>
          <RadioGroup name="comic">
            {radioList}
          </RadioGroup>
          <Button
            label="Remove"
            raised
            onClick={handleRemove}
          />
          <Button
            label="Edit"
            raised
            onClick={handleEdit}
            className="top10"
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
          <h3>{this.props.index}. {item.question}</h3>
          {checkboxes}
          <Button
            label="Remove"
            raised
            onClick={handleRemove}
          />
          <Button
            label="Edit"
            raised
            onClick={handleEdit}
            className="top10"
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
          <h3>{this.props.index}. {item.question}</h3>
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
          <Button
            label="Edit"
            raised
            onClick={handleEdit}
            className="top10"
          />
        </li>
      );
    }
    return null;
  }
}

export default Question;

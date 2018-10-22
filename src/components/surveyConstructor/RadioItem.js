// @flow
import React, { Component } from 'react';
import { throttle } from 'lodash';
import { RadioButton } from 'react-toolbox/lib/radio';

type Props = {
  removeItem: Function,
  changeAnswer: Function,
  id: number,
  answer: string,
  isRemovable: boolean,
}

class RadioItem extends Component {
  props: Props;

  render() {
    const { answer, isRemovable } = this.props;

    return (
      <div>
        {isRemovable ? <span onClick={this.handleRemoveAnswer}>x</span> : null}
        <RadioButton label="" disabled >
          <input
            type="text"
            className="hoverInput"
            value={answer}
            placeholder="Введите вариант ответа"
            onChange={throttle(this.handleChangeAnswerText, 350)}
          />
        </RadioButton>
      </div>
    );
  }

  handleChangeAnswerText = ({ currentTarget: { value } }) =>
    this.props.changeAnswer(this.props.id, value);

  handleRemoveAnswer = () => this.props.removeItem(this.props.id);

}

export default RadioItem;

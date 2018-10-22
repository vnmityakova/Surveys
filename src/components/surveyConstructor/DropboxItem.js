// @flow
import React, { Component } from 'react';
import { throttle } from 'lodash';

type Props = {
  removeItem: Function,
  changeAnswer: Function,
  id: number,
  answer: string,
  isRemovable: boolean,
}

class DropboxItem extends Component {
  props: Props;

  render() {
    const { answer, isRemovable } = this.props;

    return (
      <div>
        {isRemovable ? <span onClick={this.handleRemoveAnswer}>x</span> : null}
        <input
          type="text"
          className="top10"
          value={answer}
          placeholder="Введите элемент списка"
          onChange={throttle(this.handleChangeAnswerText, 350)}
        />
      </div>
    );
  }

  handleChangeAnswerText = ({ currentTarget: { value } }) =>
    this.props.changeAnswer(this.props.id, value);

  handleRemoveAnswer = () => this.props.removeItem(this.props.id);

}

export default DropboxItem;

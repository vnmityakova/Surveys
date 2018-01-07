// @flow
import React, { Component } from 'react';

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
          onChange={this.handleChangeAnswerText}
        />
      </div>
    );
  }

  handleChangeAnswerText = (e) => {
    this.props.changeAnswer(this.props.id, e.target.value);
  };

  handleRemoveAnswer = () => {
    this.props.removeItem(this.props.id);
  }

}

export default DropboxItem;

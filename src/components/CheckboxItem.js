// @flow
import React, { Component } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';

type Props = {
  removeItem: Function,
  changeAnswer: Function,
  id: number,
  answer: string,
  isRemovable: boolean,
}

class CheckboxItem extends Component {
  props: Props;

  render() {
    const { answer, isRemovable } = this.props;

    return (
      <div>
        {isRemovable ? <span onClick={this.handleRemoveAnswer}>x</span> : null}
        <Checkbox
          checked={false}
          label=""
          disabled
        >
          <input type="text" className="hoverInput" value={answer} onChange={this.handleChangeAnswerText} />
        </Checkbox>
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

export default CheckboxItem;

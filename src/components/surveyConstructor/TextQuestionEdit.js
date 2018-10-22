// @flow
import React, { Component, Fragment } from 'react';

type Props = {
  // saveQuestion: Function,
  // id: number,
}

type OwnState = {
  // answer: string,
};

class TextQuestionEdit extends Component {
  props: Props;
  state: OwnState = {
    // answer: '',
  };

  render() {
    return (
      <Fragment>
        <input
          type="text"
          name="answer"
          placeholder="Введите ответ"
          onChange={this.handleChange}
          disabled
        />
        <br />
        {/* <Button className="top10" label="Сохранить вопрос" raised onClick={this.handleSaveQuestion} />
        <Button className="top10" label="Отменить" raised /> */}
      </Fragment>
    );
  }

}

export default TextQuestionEdit;

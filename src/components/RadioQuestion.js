// @flow
import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import { Button } from 'react-toolbox/lib/button';

type Props = {
  addQuestionAnswerItem: Function,
}

class RadioQuestion extends Component {
  props: Props;
  state: OwnState = {
    value: 'watchmen',
  };

  render() {
    return (
      <div>
        <RadioGroup name="comic" value={this.state.value}>
          <RadioButton label="The Walking Dead" value="thewalkingdead" disabled />
          <RadioButton label="Watchmen" value="watchmen" disabled />
        </RadioGroup>
        <br />
        <Button className="top10" label="Добавить вопрос" raised onClick={this.handleAddQuestion} />
      </div>
    );
  }

  handleAddQuestion = () => {
    const answerList = [
      {
        value: 'watchmen',
        isSelected: true,
      },
      {
        value: 'thewalkingdead',
        isSelected: false,
      },
    ];
    const item = {
      answer: answerList,
      questionType: 'radio',
    };
    this.props.addQuestionAnswerItem(item);
  };

}

export default RadioQuestion;

// @flow
import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  addQuestionAnswerItem: Function,
}

type OwnState = {
  answer: Object,
};

class DateQuestion extends Component {
  props: Props;
  state: OwnState = {
    answer: null,
  };

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.answer}
          dateFormat="DD.MM.YYYY"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          disabled
          placeholderText="Выберите дату"
        />
        <br />
        <Button className="top10" label="Добавить вопрос" raised onClick={this.handleAddQuestion} />
      </div>
    );
  }

  handleAddQuestion = () => {
    const item = {
      answer: this.state.answer,
      questionType: 'date',
    };
    this.setState({
      answer: null,
    });
    this.props.addQuestionAnswerItem(item);
  };

}

export default DateQuestion;

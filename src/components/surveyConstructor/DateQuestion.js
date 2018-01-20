// @flow
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  saveQuestion: Function,
}

class DateQuestion extends Component { // eslint-disable-line
  props: Props;

  render() {
    return (
      <div>
        <DatePicker
          dateFormat="DD.MM.YYYY"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          disabled
          placeholderText="Выберите дату"
        />
      </div>
    );
  }

}

export default DateQuestion;

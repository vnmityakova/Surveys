// @flow
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import TextQuestion from './TextQuestion';
import RadioQuestion from './RadioQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import DateQuestion from './DateQuestion';
import DropboxQuestion from './DropboxQuestion';

type Props = {
  questions: [],
};

class QuestionsList extends Component { // eslint-disable-line
  props: Props;

  render() {
    return (
      <section className="displayItem">
        <div className="wrapper">
          <ul>
            {this.props.questions.map((item) => {
              if (item.questionType === 'text') {
                return <TextQuestion question={item} />;
              } else if (item.questionType === 'radio') {
                return <RadioQuestion question={item} />;
              } else if (item.questionType === 'checkbox') {
                return <CheckboxQuestion question={item} />;
              } else if (item.questionType === 'date') {
                return <DateQuestion question={item} />;
              } else if (item.questionType === 'dropbox') {
                return <DropboxQuestion question={item} />;
              }
              return null;
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default QuestionsList;


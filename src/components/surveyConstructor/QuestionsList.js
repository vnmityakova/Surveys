// @flow
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import Question from './Question';

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
              return (<Question item={item} />);
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default QuestionsList;

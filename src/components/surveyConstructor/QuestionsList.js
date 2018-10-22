// @flow
import React, { Component } from 'react';
import { connect, Connector } from 'react-redux';
import 'react-select/dist/react-select.css';
import QuestionViewBlock from './QuestionViewBlock';
import QuestionEditBlock from './QuestionEditBlock';
import type { QuestionType } from '../../types/layout';

type OwnProps = {
  questions: [],
};

type DispatchProps = {
  editingQuestion: QuestionType,
};

type Props = OwnProps & DispatchProps;

class QuestionsList extends Component { // eslint-disable-line
  props: Props;

  render() {
    return (
      <section className="displayItem">
        <div className="wrapper">
          <ul>
            {this.props.questions.map((item) => {
              const { editingQuestion } = this.props;
              const isEditing = editingQuestion && editingQuestion.id === item.id;
              if (isEditing) {
                return <QuestionEditBlock />;
              }
              return <QuestionViewBlock item={item} />;
            })}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: State) => ({
  editingQuestion: state.layout.editingQuestion,
});

const connector: Connector<OwnProps, {}> = connect(mapStateToProps, null);

export default connector(QuestionsList);

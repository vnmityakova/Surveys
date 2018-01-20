// @flow
import React, { Component } from 'react';
import { connect, Connector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import type { Dispatch, State } from '../../types/index';
import Question from './Question';
import type { QuestionType } from '../../types/layout';
import { changeQuestion, removeQuestion } from '../../actions/survey';

type OwnProps = {
  match: Object,
  questions: [],
  editingQuestion: QuestionType,
};

type DispatchProps = {
  onRemoveQuestion: Function,
  onChangeQuestion: Function,
};

type Props = OwnProps & DispatchProps;

class QuestionsList extends Component { // eslint-disable-line
  props: Props;

  render() {
    const { onRemoveQuestion, match, onChangeQuestion, editingQuestion } = this.props;
    return (
      <section className="displayItem">
        <div className="wrapper">
          <ul>
            {this.props.questions.map((item, i) => {
              return (<Question
                item={item}
                index={i + 1}
                key={item.id}
                removeQuestion={onRemoveQuestion}
                surveyId={match.params.id}
                changeQuestion={onChangeQuestion}
                isEditing={editingQuestion && editingQuestion.id === item.id}
              />);
            })}
          </ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: State) => ({
  questions: state.layout.questions,
  editingQuestion: state.layout.editingQuestion,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onRemoveQuestion: (questionId, surveyId) => dispatch(removeQuestion(questionId, surveyId)),
  onChangeQuestion: (questionId, questionObj) => dispatch(changeQuestion(questionId, questionObj)),
});

const connector: Connector<OwnProps, DispatchProps> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(QuestionsList));

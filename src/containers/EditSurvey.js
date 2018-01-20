// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import { connect, Connector } from 'react-redux';
import {
  addNewQuestion,
  clearNewSurveyId,
  changeSurveyTitle,
  getSurveyDataById,
  setQuestionsPerPage,
  setEditSurveyId,
} from '../actions/survey';
import type { Dispatch, State } from '../types/index';
import QuestionAddBlock from '../components/surveyConstructor/QuestionAddBlock';
import QuestionsList from '../components/surveyConstructor/QuestionsList';
import SurveyParamsBlock from '../components/surveyConstructor/SurveyParamsBlock';

type OwnProps = {
  match: Object,
  surveyParams: Object,
  questions: [],
};

type DispatchProps = {
  getSurveyDataById: Function,
  addNewQuestion: Function,
  clearNewSurveyId: Function,
  changeSurveyTitle: Function,
  setQuestionsPerPage: Function,
  setEditSurveyId: Function,
};

type Props = OwnProps & DispatchProps;

class EditSurvey extends Component {
  props: Props;

  componentWillMount() {
    this.props.getSurveyDataById(this.props.match.params.id);
    this.props.setEditSurveyId(this.props.match.params.id);
    this.props.clearNewSurveyId();
  }

  render() {
    const { surveyParams, match } = this.props;
    return (
      <div className="editSurvey">
        <SurveyParamsBlock
          surveyParams={surveyParams}
          surveyId={match.params.id}
          setQuestionsPerPage={this.setQuestionsPerPage}
          changeSurveyTitle={this.changeSurveyTitle}
        />
        <QuestionAddBlock
          addNewQuestion={this.props.addNewQuestion}
          surveyId={match.params.id}
        />
        <QuestionsList /* questions={this.props.questions} */ />
      </div>
    );
  }

}

const mapStateToProps = (state: State) => ({
  questions: state.layout.questions,
  surveyParams: state.layout.surveyParams,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getSurveyDataById: surveyId => dispatch(getSurveyDataById(surveyId)),
  addNewQuestion: (question, surveyId) => dispatch(addNewQuestion(question, surveyId)),
  clearNewSurveyId: () => dispatch(clearNewSurveyId()),
  changeSurveyTitle: (surveyId, title) => dispatch(changeSurveyTitle(surveyId, title)),
  setQuestionsPerPage: (number, surveyId) => dispatch(setQuestionsPerPage(number, surveyId)),
  setEditSurveyId: surveyId => dispatch(setEditSurveyId(surveyId)),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(EditSurvey));

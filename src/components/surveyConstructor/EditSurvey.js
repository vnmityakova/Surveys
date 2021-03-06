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
} from '../../actions/survey';
import type { Dispatch, State } from '../../types/index';
import QuestionAddBlock from './QuestionAddBlock';
import QuestionsList from './QuestionsList';
import SurveyParamsBlock from './SurveyParamsBlock';
import type { SurveyParamsType } from '../../types/layout';
import '../../assets/css/surveyConstructor.scss';

type OwnProps = {
  match: Object,
  surveyParams: SurveyParamsType,
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
    const id = this.props.match.params.id;
    this.props.getSurveyDataById(id);
    this.props.setEditSurveyId(id);
    this.props.clearNewSurveyId();
  }

  render() {
    const { surveyParams, match } = this.props;
    return (
      <div className="editSurvey">
        <SurveyParamsBlock
          surveyParams={surveyParams}
          surveyId={match.params.id}
          setQuestionsPerPage={this.props.setQuestionsPerPage}
          changeSurveyTitle={this.props.changeSurveyTitle}
        />
        <QuestionAddBlock
          addNewQuestion={this.props.addNewQuestion}
          surveyId={match.params.id}
        />
        <QuestionsList questions={this.props.questions} />
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

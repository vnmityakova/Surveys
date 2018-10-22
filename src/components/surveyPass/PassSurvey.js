// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import { connect, Connector } from 'react-redux';
import type { Dispatch, State } from '../../types';
import {getSurveyDataById} from "../../actions/surveyPass";
import QuestionsList from "./QuestionsList";

type OwnProps = {
  match: Object,
  surveyParams: SurveyParamsType,
  questions: [],
};

type DispatchProps = {
  getSurveyDataById: Function,
};

type Props = OwnProps & DispatchProps;

class PassSurvey extends Component {
  props: Props;

  componentWillMount() {
    this.props.getSurveyDataById(this.props.match.params.id);
  }

  render() {
    const { surveyParams, questions } = this.props;
    return (
      <div className="passSurvey">
        <h3>{surveyParams.title}</h3>
        <QuestionsList questions={questions} />
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
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(PassSurvey));

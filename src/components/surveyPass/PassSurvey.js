// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import { connect, Connector } from 'react-redux';
import type { Dispatch, State } from '../../types';

type OwnProps = {
  match: Object,
  surveyParams: SurveyParamsType,
  questions: [],
};

type DispatchProps = {

};

type Props = OwnProps & DispatchProps;

class PassSurvey extends Component {
  props: Props;

  componentWillMount() {

  }

  render() {
    // const { surveyParams, match } = this.props;
    return (
      <div className="passSurvey">
        Прохождение теста
      </div>
    );
  }

}

const mapStateToProps = (state: State) => ({
  questions: state.layout.questions,
  surveyParams: state.layout.surveyParams,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({

});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(PassSurvey));

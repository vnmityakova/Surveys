// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import type { Connector } from 'react-redux';
import NotFound from '../components/NotFound';
import {
  APP_ROOT,
  ABOUT_PATH,
  SURVEY_LIST,
  EDIT_SURVEY_WITH_ID,
} from '../constants/routes';
import type { State, Dispatch } from '../types';
import type {
  LayoutState,
} from '../types';
import EditSurvey from './EditSurvey';
import Login from '../components/Login';
import { reloginUser } from "../actions/survey";
import About from '../components/About';
import SurveyList from './SurveyList';

type Props = {};

type OwnProps = {
  user: Object,
  isAuthChecked: boolean,
};

type StateProps = LayoutState & OwnProps;
type DispatchProps = {

};

class Layout extends Component {
  props: StateProps;

  componentDidMount() {
    this.props.reloginUser();
  }

  render() {
    return (
      <div className="app">
        <Login />
        <Switch>
          <Route
            exact
            path={APP_ROOT}
            render={() => {
              return (
                <Redirect to={{ pathname: ABOUT_PATH }} />
              );
            }}
          />
          {this.props.isAuthChecked && <Route
            path={EDIT_SURVEY_WITH_ID}
            render={() => {
              return (
                this.props.user
                  ? <EditSurvey />
                  : <Redirect to={{ pathname: ABOUT_PATH }} />
              );
            }}
          />}
          {this.props.isAuthChecked && <Route
            path={SURVEY_LIST}
            render={() => {
              return (
                this.props.user
                  ? <SurveyList />
                  : <Redirect to={{ pathname: ABOUT_PATH }} />
              );
            }}
          />}
          {<Route
            path={ABOUT_PATH}
            render={() => {
              return (
                  <About />
              );
            }}
          />}
          {/*<Route component={NotFound} />*/}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: State): StateProps => {
  return {
    user: state.layout.user,
    isAuthChecked: state.layout.isAuthChecked,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    reloginUser: () => dispatch(reloginUser()),
  };
};

const connector: Connector<OwnProps, Props> = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(Layout));

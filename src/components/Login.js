// @flow
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { State, Dispatch } from '../types';
import { setUser, logout } from "../actions/survey";

type OwnProps = {
  user: Object,
}
type DispatchProps = {
  setUser: Function,
  logout: Function,
}

type Props = OwnProps & DispatchProps;

class Login extends Component {
  props: Props;

  componentWillReceiveProps(nextProps: Object) {

  }

  render() {
    const button = this.props.user
      ? <button onClick={this.props.logout}>Log Out</button>
      : <button onClick={this.props.setUser}>Log In</button>;
    return (
      <div>
        {button}
      </div>
    );
  }

}

const mapStateToProps = (state: State) => {
  return {
    user: state.layout.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setUser: () => dispatch(setUser()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

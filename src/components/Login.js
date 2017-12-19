// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { Button } from 'react-toolbox/lib/button';
import type { State, Dispatch } from '../types';
import { setUser, logout } from '../actions/survey';

type OwnProps = {
  user: Object,
}
type DispatchProps = {
  setUser: Function,
  logout: Function,
}

type Props = OwnProps & DispatchProps;

class Login extends Component { // eslint-disable-line
  props: Props;

  render() {
    const {
      user,
    } = this.props;
    const iconLang = (<div>
      { user && user.email }
      <i className="material-icons arrow">keyboard_arrow_down</i>
    </div>);

    const userMenu = (
      <IconMenu
        icon={iconLang}
        position="topRight"
        menuRipple={false}
        iconRipple={false}
        className="userButton"
      >
        <MenuItem
          value="Logout"
          icon="exit_to_app"
          onClick={this.props.logout}
          caption="Выйти"
        />
      </IconMenu>
    );

    const button = user
      ? userMenu
      : <Button label="Log In" raised onClick={this.props.setUser} />;

    return (
      <div className="authMenu">
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

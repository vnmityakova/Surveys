import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN_PATH } from '../constants/routes';

type OwnProps = {
  component: any,
  isAuthorized: boolean,
  location: Object,
}

const PrivateRoute = ({ component: Component, isAuthorized, ...rest }: OwnProps) => (
  <Route
    {...rest}
    render={props => (
      isAuthorized
        ? <Component {...props} />
        : <Redirect to={{ pathname: LOGIN_PATH, state: { from: props.location } }} />
    )}
  />
);

export default PrivateRoute;

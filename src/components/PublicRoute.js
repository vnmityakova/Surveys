import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { APP_ROOT } from '../constants/routes';

type OwnProps = {
  component: any,
  isAuthorized: boolean,
  location: Object,
}

const PublicRoute = ({ component: Component, isAuthorized, ...rest }: OwnProps) => (
  <Route
    {...rest}
    render={props => (
      isAuthorized
        ? <Redirect to={{ pathname: APP_ROOT, state: { from: props.location } }} />
        : <Component {...props} />
    )}
  />
);

export default PublicRoute;

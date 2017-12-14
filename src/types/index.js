// @flow
import type {
  AppConfig,
  LayoutActions,
  LayoutState,
} from './layout';
/*
 * define Application types
 */
type Id = number;

type ParseObject = Object;


type RoutingState = {
  location: {
    hash: string,
    key: string,
    pathname: string,
    search: string,
    state?: Object,
  }
};

type AuthState = {
  authError: Object,
  isAuthorized: boolean,
  isAuthStatusLoaded: boolean,
  loggingIn: boolean,
};

type Action =
  | LayoutActions
  | { type: 'AUTH_REQUEST' }
  | { type: 'AUTH_FAIL' }
  | { type: 'AUTH_SUCCESS', isAuthorized: boolean }
  | { type: 'LOGIN_SUCCESS', isAuthorized: boolean }
  | { type: 'LOGIN_FAIL', authError: ParseObject }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'LOGOUT_FAIL', authError: ParseObject }
;

type State = {
  +layout: LayoutState,
  +routing: RoutingState,
};

type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
type GetState = () => Object;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
export type {
  Action,
  AppConfig,
  LayoutState,
  AuthState,
  Dispatch,
  GetState,
  Id,
  ParseObject,
  PromiseAction,
  RoutingState,
  State,
  ThunkAction,
};

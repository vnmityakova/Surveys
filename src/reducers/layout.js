// @flow
import type { Action, LayoutState } from '../types';

const initialState = {
  config: null,
  error: null,
  loaded: false,
  version: '',
  questions: [],
  user: null,
  isAuthChecked: false,
};

const reducer = (state: LayoutState = initialState, action: Action): LayoutState => {
  switch (action.type) {
    case 'APP_INIT_SUCCESS':
      return {
        ...state,
        loaded: true,
      };
    case '@@SURVEY/GET_QUESTIONS_SUCCESS':
      return {
        ...state,
        questions: action.questions,
      };
    case '@@SURVEY/SET_USER_SUCCESS':
      return {
        ...state,
        user: action.user,
        isAuthChecked: true,
      };
    case '@@SURVEY/USER_LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
      };
    case '@@SURVEY/SET_NOT_AUTHORIZED':
      return {
        ...state,
        isAuthChecked: true,
      };
    default:
      return state;
  }
};

export default reducer;

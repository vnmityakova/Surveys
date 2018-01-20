// @flow
import type { Action, LayoutState } from '../types';

const initialState = {
  surveyParams: {},
  config: null,
  error: null,
  loaded: false,
  version: '',
  questions: [],
  user: null,
  isAuthChecked: false,
  surveyList: [],
  newSurveyId: '',
  editSurveyId: '',
  editingQuestion: null,
};

const reducer = (state: LayoutState = initialState, action: Action): LayoutState => {
  switch (action.type) {
    case 'APP_INIT_SUCCESS':
      return {
        ...state,
        loaded: true,
      };
    case '@@SURVEY/GET_SURVEY_DATA_SUCCESS':
      return {
        ...state,
        surveyParams: action.params,
        questions: action.questions,
      };
    /* case '@@SURVEY/GET_QUESTIONS_SUCCESS':
      return {
        ...state,
        questions: action.questions,
      }; */
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
    case '@@SURVEY/GET_SURVEYS_SUCCESS':
      return {
        ...state,
        surveyList: action.surveys,
      };
    case '@@SURVEY/SET_EDIT_SURVEY_ID_SUCCESS':
      return {
        ...state,
        editSurveyId: action.surveyId,
      };
    case '@@SURVEY/ADD_SURVEY_SUCCESS':
      return {
        ...state,
        newSurveyId: action.newId,
      };
    case '@@SURVEY/CHANGE_EDITING_QUESTION_SUCCESS':
      return {
        ...state,
        editingQuestion: action.editingQuestion,
      };
    case '@@SURVEY/CANCEL_QUESTION_EDIT_SUCCESS':
      return {
        ...state,
        editingQuestion: null,
      };
    case '@@SURVEY/CLEAR_NEW_SURVEY_ID':
      return {
        ...state,
        newSurveyId: '',
      };
    default:
      return state;
  }
};

export default reducer;

// @flow
import { forEach } from 'lodash';
import type {
  Dispatch,
  ThunkAction,
} from '../types';
import firebase, { auth, provider } from '../firebase';

export const getSurveyDataById = (surveyId): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref(`/surveyList/${surveyId}`);
    itemsRef.on('value', (snapshot) => {
      const survey = snapshot.val();
      const { params, questionList } = survey;
      const questions = [];
      forEach(questionList, (item, id) => {
        questions.push({
          id,
          question: item.question,
          answer: item.answer,
          questionType: item.questionType,
        });
      });
      dispatch({ type: '@@SURVEY/GET_SURVEY_DATA_SUCCESS', params, questions });
    });
  } catch (e) {
    dispatch({ type: '@@SURVEY/GET_SURVEY_DATA_FAIL' });
  }
};

export const addNewQuestion = (question, surveyId): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref(`/surveyList/${surveyId}/questionList`);
    itemsRef.push(question);
    dispatch({ type: '@@SURVEY/ADD_QUESTION_SUCCESS' });
  } catch (e) {
    dispatch({ type: '@@SURVEY/ADD_QUESTION_FAIL' });
  }
};

export const removeQuestion = (questionId, surveyId): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemRef = firebase.database().ref(`/surveyList/${surveyId}/questionList/${questionId}`);
    itemRef.remove();
    dispatch({ type: '@@SURVEY/REMOVE_QUESTION_SUCCESS' });
  } catch (e) {
    dispatch({ type: '@@SURVEY/REMOVE_QUESTION_FAIL' });
  }
};

export const changeSurveyTitle = (surveyId, title): ThunkAction => (dispatch: Dispatch) => {
  try {
    firebase.database().ref(`/surveyList/${surveyId}/params`).update({
      title,
    });
    dispatch({ type: '@@SURVEY/CHANGE_SURVEY_TITLE_SUCCESS', title });
  } catch (e) {
    dispatch({ type: '@@SURVEY/CHANGE_SURVEY_TITLE_FAIL' });
  }
};

export const setQuestionsPerPage = (questionsPerPage, surveyId): ThunkAction => (dispatch: Dispatch) => {
  try {
    firebase.database().ref(`/surveyList/${surveyId}/params`).update({
      questionsPerPage,
    });
    dispatch({ type: '@@SURVEY/SET_SURVEY_QUESTIONS_PER_PAGE_SUCCESS', questionsPerPage });
  } catch (e) {
    dispatch({ type: '@@SURVEY/SET_SURVEY_QUESTIONS_PER_PAGE_FAIL' });
  }
};

export const createSurvey = (): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref('surveyList');
    const params = {
      title: 'Опрос без названия',
    };
    const newEl = itemsRef.push({
      params,
    });
    const key = newEl.key;
    dispatch({ type: '@@SURVEY/ADD_SURVEY_SUCCESS', newId: key });
  } catch (e) {
    dispatch({ type: '@@SURVEY/ADD_SURVEY_FAIL' });
  }
};

export const clearNewSurveyId = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: '@@SURVEY/CLEAR_NEW_SURVEY_ID' });
};

export const getSurveyList = (): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref('surveyList');
    itemsRef.on('value', (snapshot) => {
      const surveys = [];
      const items = snapshot.val();
      forEach (items, (item, id) => { // eslint-disable-line
        surveys.push({
          id,
          title: item.params.title,
        });
      });
      dispatch({ type: '@@SURVEY/GET_SURVEYS_SUCCESS', surveys });
    });
  } catch (e) {
    dispatch({ type: '@@SURVEY/GET_SURVEYS_FAIL' });
  }
};

export const setUser = (): ThunkAction => (dispatch: Dispatch) => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      dispatch({ type: '@@SURVEY/SET_USER_SUCCESS', user });
    });
};

export const reloginUser = (): ThunkAction => (dispatch: Dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: '@@SURVEY/SET_USER_SUCCESS', user }); // TODO error handling
    } else {
      dispatch({ type: '@@SURVEY/SET_NOT_AUTHORIZED' }); // TODO error handling
    }
  });
};

export const logout = (): ThunkAction => (dispatch: Dispatch) => {
  auth.signOut().then(() => {
    dispatch({ type: '@@SURVEY/USER_LOGOUT_SUCCESS' });
  });
};

/* export const getQuestions2 = (): ThunkAction => { // (dispatch: Dispatch, getState: GetState) => any;
  const itemsRef = firebase.database().ref('items');
  let items = {};
  const questions = [];
  return (dispatch: Dispatch) => itemsRef.on('value', (snapshot) => { // (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
    items = snapshot.val();
    for (const item in items) { // eslint-disable-line
      questions.push({
        id: item,
        question: items[item].question,
        answer: items[item].answer,
      });
    }
    dispatch({ type: '@@SURVEY/GET_QUESTIONS_SUCCESS', questions });
  });
}; */

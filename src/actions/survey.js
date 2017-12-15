// @flow
import type {
  Dispatch,
  ThunkAction,
} from '../types';
import firebase, { auth, provider } from '../firebase';

export const getQuestions = (): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      const questions = [];
      const items = snapshot.val();
      for (const item in items) { // eslint-disable-line
        questions.push({
          id: item,
          question: items[item].question,
          answer: items[item].answer,
        });
      }
      dispatch({ type: '@@SURVEY/GET_QUESTIONS_SUCCESS', questions });
    });
  } catch (e) {
    dispatch({ type: '@@SURVEY/GET_QUESTIONS_FAIL' });
  }
};

export const getQuestionsById = (surveyId): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref(`/surveyList/${surveyId}/questionList`);
    itemsRef.on('value', (snapshot) => {
      const questions = [];
      const items = snapshot.val();
      for (const item in items) { // eslint-disable-line
        questions.push({
          id: item,
          question: items[item].question,
          answer: items[item].answer,
        });
      }
      dispatch({ type: '@@SURVEY/GET_QUESTIONS_SUCCESS', questions });
    });
  } catch (e) {
    dispatch({ type: '@@SURVEY/GET_QUESTIONS_FAIL' });
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

export const removeQuestion = (id): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemRef = firebase.database().ref(`/items/${id}`);
    itemRef.remove();
    dispatch({ type: '@@SURVEY/REMOVE_QUESTION_SUCCESS' });
  } catch (e) {
    dispatch({ type: '@@SURVEY/REMOVE_QUESTION_FAIL' });
  }
};

export const createSurvey = (): ThunkAction => (dispatch: Dispatch) => {
  try {
    const itemsRef = firebase.database().ref('surveyList');
    const params = {
      title: '',
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
      for (const item in items) { // eslint-disable-line
        surveys.push({
          id: item,
          title: items[item].title,
        });
      }
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

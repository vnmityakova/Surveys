// @flow
import { forEach, cloneDeep } from 'lodash';
import type {
  Dispatch,
  ThunkAction,
} from '../types';
import firebase, { auth, provider } from '../firebase';
import type { QuestionType } from '../types/layout';

export const getSurveyDataById = (surveyId): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const { user } = getState().layout;
  const cleanedEmail = user.email.replace('.', '');
  try {
    const itemsRef = firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}`);
    itemsRef.on('value', (snapshot) => {
      const survey = snapshot.val();
      const { params, questionList } = survey;
      const questions = [];
      forEach(questionList, (item, id) => {
        questions.push({
          id,
          question: item.question,
          answers: item.answers,
          questionType: item.questionType,
          isEditing: item.isEditing,
          index: item.index,
        });
      });
      dispatch({ type: '@@SURVEY/GET_SURVEY_DATA_SUCCESS', params, questions });
    });
  } catch (e) {
    dispatch({ type: '@@SURVEY/GET_SURVEY_DATA_FAIL' });
  }
};

export const addNewQuestion = (question, surveyId): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const { user } = getState().layout;
  const cleanedEmail = user.email.replace('.', '');
  try {
    const { questions } = getState().layout;
    const index = questions.length + 1;
    const itemsRef = firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}/questionList`);
    question = {
      ...question,
      index,
    };
    itemsRef.push(question);
    dispatch({ type: '@@SURVEY/ADD_QUESTION_SUCCESS' });
  } catch (e) {
    dispatch({ type: '@@SURVEY/ADD_QUESTION_FAIL' });
  }
};

export const removeQuestion = (questionId, surveyId): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const { user } = getState().layout;
  const cleanedEmail = user.email.replace('.', '');
  try {
    const itemRef = firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}/questionList/${questionId}`);
    itemRef.remove();
    dispatch({ type: '@@SURVEY/REMOVE_QUESTION_SUCCESS' });
  } catch (e) {
    dispatch({ type: '@@SURVEY/REMOVE_QUESTION_FAIL' });
  }
};

export const changeQuestion = (questionId: string, question: QuestionType): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    // const surveyId = getState().layout.editSurveyId;
    const clonedQuestion = cloneDeep(question);
    let editingQuestion = getState().layout.editingQuestion;
    if (editingQuestion) {
      editingQuestion = {
        ...editingQuestion,
        ...clonedQuestion,
      };
    } else {
      editingQuestion = {
        ...clonedQuestion,
        id: questionId,
      };
    }
    dispatch({ type: '@@SURVEY/CHANGE_EDITING_QUESTION_SUCCESS', editingQuestion });
  };

export const saveQuestion = (): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const { user } = getState().layout;
  const cleanedEmail = user.email.replace('.', '');
  try {
    const surveyId = getState().layout.editSurveyId;
    const { id, question, answers, questionType } = getState().layout.editingQuestion;
    firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}/questionList/${id}`).update({
      question,
      answers: answers || [], // TODO при создании вопроса бы сразу ставить []
      questionType,
    });
    console.warn(question);
    dispatch({ type: '@@SURVEY/SAVE_QUESTION_SUCCESS' });
    dispatch({ type: '@@SURVEY/CANCEL_QUESTION_EDIT_SUCCESS' });
  } catch (e) {
    dispatch({ type: '@@SURVEY/SAVE_QUESTION_FAIL', e });
  }
};

export const cancelEdit = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: '@@SURVEY/CANCEL_QUESTION_EDIT_SUCCESS' });
};

export const changeSurveyTitle = (surveyId, title): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const { user } = getState().layout;
  const cleanedEmail = user.email.replace('.', '');
  try {
    firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}/params`).update({
      title,
    });
    dispatch({ type: '@@SURVEY/CHANGE_SURVEY_TITLE_SUCCESS', title });
  } catch (e) {
    dispatch({ type: '@@SURVEY/CHANGE_SURVEY_TITLE_FAIL' });
  }
};

export const setQuestionsPerPage = (questionsPerPage, surveyId): ThunkAction =>
  (dispatch: Dispatch, getState: GetState) => {
    const { user } = getState().layout;
    const cleanedEmail = user.email.replace('.', '');
    try {
      firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}/params`).update({
        questionsPerPage,
      });
      dispatch({ type: '@@SURVEY/SET_SURVEY_QUESTIONS_PER_PAGE_SUCCESS', questionsPerPage });
    } catch (e) {
      dispatch({ type: '@@SURVEY/SET_SURVEY_QUESTIONS_PER_PAGE_FAIL' });
    }
  };

export const setEditSurveyId = (surveyId): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: '@@SURVEY/SET_EDIT_SURVEY_ID_SUCCESS', surveyId });
};

export const setQuestionEditMode = (questionId, surveyId): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const { user } = getState().layout;
  const cleanedEmail = user.email.replace('.', '');
  try {
    firebase.database().ref(`${cleanedEmail}/surveyList/${surveyId}/questionList/${questionId}`).update({
      isEditing: true,
    });
    dispatch({ type: '@@SURVEY/SET_QUESTION_EDIT_MODE_SUCCESS', questionId });
  } catch (e) {
    dispatch({ type: '@@SURVEY/SET_QUESTION_EDIT_MODE_FAIL' });
  }
};

export const createSurvey = (): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  try {
    const { user } = getState().layout;
    const cleanedEmail = user.email.replace('.', '');
    const itemsRef = firebase.database().ref(`${cleanedEmail}/surveyList`);
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

export const getSurveyList = (): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  try {
    const { user } = getState().layout;
    const cleanedEmail = user.email.replace('.', '');
    const itemsRef = firebase.database().ref(`${cleanedEmail}/surveyList`);
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
      const curUser = result.user;
      const cleanedEmail = curUser.email.replace('.', '');
      const dataHeadRef = firebase.database().ref();

      dataHeadRef.child(cleanedEmail).once('value', (snapshot) => {
        const exists = (snapshot.val() !== null);
        if (!exists) {
          const user = {
            userParams: {
              email: curUser.email,
            },
          };
          dataHeadRef.update({ [cleanedEmail]: user });
          dispatch({ type: '@@SURVEY/ADD_USER', curUser });
        }
      });
      dispatch({ type: '@@SURVEY/SET_USER_SUCCESS', curUser });
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

import firebase from '../firebase';
import type { Dispatch, ThunkAction } from '../types';
import { getSurveyData } from './survey';

export const getSurveyDataById = (surveyId): ThunkAction => (dispatch: Dispatch) => {
  try {
    const surveyUserListRef = firebase.database().ref(`surveyUserList/${surveyId}`);
    surveyUserListRef.on('value', (surveyUserSnapshot) => {
      const cleanedEmail = surveyUserSnapshot.val();
      dispatch(getSurveyData(surveyId, cleanedEmail));
    });
  } catch (e) {
    dispatch({ type: '@@SURVEY/GET_SURVEY_DATA_FAIL' });
  }
};

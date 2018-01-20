import type { ParseObject } from './index';
type AppConfig = {
  startPage: string;
  version: string,
};

export type QuestionType = {
  id: string,
  index: number,
  question: string,
  questionType?: string,
  answer?: Array,
}

type LayoutState = {
  +config: ?AppConfig,
  +error: ?Object,
  +loaded: boolean,
  surveyParams: ?Object,
  questions: Array,
  user: ?Object,
  isAuthChecked: boolean,
  surveyList: Array;
  newSurveyId: String,
  editSurveyId: String,
  editingQuestion: QuestionType,
};

type LayoutActions =
  { type: 'APP_INIT_SUCCESS' }
  | { type: 'APP_CONFIG_SUCCESS', +config: ParseObject }
;

export type {
  AppConfig,
  LayoutActions,
  LayoutState,
};

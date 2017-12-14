import type { ParseObject } from './index';
type AppConfig = {
  startPage: string;
  version: string,
};


type LayoutState = {
  +config: ?AppConfig,
  +error: ?Object,
  +loaded: boolean,
  questions: Array;
  user: ?Object,
  isAuthChecked: boolean,
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

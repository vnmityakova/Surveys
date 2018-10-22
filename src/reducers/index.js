import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import surveyConstructor from './surveyConstructor';

export default combineReducers({
  surveyConstructor,
  routing: routerReducer,
});

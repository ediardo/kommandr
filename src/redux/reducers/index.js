import { combineReducers } from 'redux';
import programReducer from './programs';
import commandLineReducer from './commandLine';
import optionReducer from './options';
import uiReducer from './ui';

export default combineReducers({
  programs: programReducer,
  options: optionReducer,
  commandLine: commandLineReducer,
  ui: uiReducer
});

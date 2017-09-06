import { combineReducers } from 'redux';
import commandLineReducer from './commandLine';

export default combineReducers({
  commandLine: commandLineReducer
});

import * as types from '../constants/ActionTypes';

const addProgram = program => ({
  type: types.ADD_PROGRAM,
  payload: {
    ...program
  }
});

const addOption = option => ({
  type: types.ADD_OPTION,
  payload: {
    ...option
  }
});
const setOptionValue = value => ({
  type: types.SET_OPTION_VALUE,
  payload: {
    ...value
  }
});
const removeOption = option => ({
  type: types.REMOVE_OPTION,
  payload: {
    ...option
  }
});
const resetCli = () => ({
  type: types.RESET_CLI
});

export default {
  addProgram,
  addOption,
  setOptionValue,
  removeOption,
  resetCli
}

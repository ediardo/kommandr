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
const setTitle = title => ({
  type: types.SET_TITLE,
  payload: {
    ...title
  }
});
const removeOption = option => ({
  type: types.REMOVE_OPTION,
  payload: {
    ...option
  }
});
const replaceProgram = (pos, oldProgram, newProgram) => ({
  type: types.REPLACE_PROGRAM,
  payload: {
    ...pos,
    ...oldProgram,
    ...newProgram
  }
})
const resetCli = () => ({
  type: types.RESET_CLI
});

export default {
  addProgram,
  addOption,
  setOptionValue,
  setTitle,
  removeOption,
  replaceProgram,
  resetCli
}

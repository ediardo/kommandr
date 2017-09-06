import * as types from '../constants/ActionTypes';

const setCli = cli => ({
  type: types.SET_CLI,
  payload: {
    ...cli
  }
});

const setTitle = title => ({
  type: types.SET_TITLE,
  payload: {
    ...title
  }
});

const setDescription = description => ({
  type: types.SET_DESCRIPTION,
  payload: {
    ...description
  }
});

export default {
  setCli,
  setTitle,
  setDescription
}

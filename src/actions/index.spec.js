import * as types from '../constants/ActionTypes';
import * as actions from './index';

describe('actionTypes', () => {
  test('fetchPrograms should create FETCH_PROGRAMS action', () => {
    expect(actions.fetchPrograms()).toEqual({
      type: types.FETCH_PROGRAMS
    })
  });
});

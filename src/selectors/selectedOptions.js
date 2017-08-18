import {createSelector} from 'reselect';
import _ from 'lodash';

const optionsSelector = state => state.options;
const selectedOptionsSelector = state => {
  if (Object.keys(state.commandLine).length === 0) return [];
  const programId = Object.keys(state.commandLine)[0];
  return state.commandLine[programId].allOptions;
}

const getOptions = (options, selectedOptionsIds) => {
  const selectedOptions = _.filter(
    options,
    option => _.includes(selectedOptionsIds, option.id)
  );
  return selectedOptions;
};

export default createSelector(
  optionsSelector,
  selectedOptionsSelector,
  getOptions
);

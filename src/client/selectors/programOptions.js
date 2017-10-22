import { createSelector } from 'reselect';
import _ from 'lodash';

const optionsSelector = state => state.options;
const programSelector = state => {
  if (state.commandLine.allPrograms === undefined) return [];
  return state.commandLine.allPrograms;
}

const getOptions = (options, selectedProgramId) => {
  const programOptions = _.filter(
    options,
    option => _.includes(selectedProgramId, option.programId)
  );
  return _.orderBy(programOptions, ['name', 'asc']);
};


export default createSelector(
  optionsSelector,
  programSelector,
  getOptions
);

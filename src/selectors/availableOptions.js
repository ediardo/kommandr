import {createSelector} from 'reselect';
import _ from 'lodash';

const programSelector = state => state.commandLine.allPrograms || [];
const optionsSelector = state => state.options;
const selectedOptionsSelector = state => {
  if (Object.keys(state.commandLine).length === 0) return [];
  const programId = Object.keys(state.commandLine)[0];
  return state.commandLine[programId].allOptions;
}

const getOptions = (selectedProgramId, options, selectedOptionsIds) => {
  const programOptions = _.filter(
    options,
    option => _.includes(selectedProgramId, option.programId)
  );

  const availableOptions = _.reject(
    programOptions,
    option => _.includes(selectedOptionsIds, option.id)
  );
  
  return availableOptions;
};


export default createSelector(
  programSelector,
  optionsSelector,
  selectedOptionsSelector,
  getOptions
);

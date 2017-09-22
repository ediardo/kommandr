import {createSelector} from 'reselect';
import _ from 'lodash';

const programSelector = state => state.programs;
const selectedProgramsSelector = state => {
  return state.commandLine.allPrograms;
}

const getPrograms = (programs, selectedProgramsIds) => {
  const selectedPrograms = _.filter(
    programs,
    program => _.includes(selectedProgramsIds, program.id)
  );
  return selectedPrograms;
};

export default createSelector(
  programSelector,
  selectedProgramsSelector,
  getPrograms
);

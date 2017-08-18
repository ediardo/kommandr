import React from 'react';
import {connect} from 'react-redux';
import selectedProgramsSelector from '../selectors/selectedPrograms';
import Program from '../components/Program';
import SelectedOptions from './SelectedOptions';

class SelectedPrograms extends React.Component {

  render() {
    const {programs} = this.props;
    let programList = null;
    if (programs.length > 0) {
      programList = programs.map(program => {

        return (
          <span key={program.id}>
            <Program program={program} />
            <SelectedOptions program={program} />
          </span>
        )
      });
    }
    return (
      <span>
      {programList}
      </span>
    )
  }
}

const mapStateToProps = state => ({
  programs: selectedProgramsSelector(state),
  commandLine: state.commandLine
});

export default connect(mapStateToProps)(SelectedPrograms);

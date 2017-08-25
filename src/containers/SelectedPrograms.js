import React from 'react';
import { connect } from 'react-redux';

import selectedProgramsSelector from '../selectors/selectedPrograms';
import Program from '../components/Program';
import SelectedOptions from './SelectedOptions';
import Space from '../components/Space';

class SelectedPrograms extends React.Component {

  render() {
    const {programs} = this.props;
    let programList = null;
    if (programs.length > 0) {
      programList = programs.map(program => {
        return (
          <span key={program.id}>
            <Program program={program} className="float-left"/>
            <Space className="float-left" />
            <SelectedOptions program={program} />
          </span>
        )
      });
    }
    return (
      <div className="float-left">
        {programList}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  programs: selectedProgramsSelector(state),
  commandLine: state.commandLine
});

export default connect(mapStateToProps)(SelectedPrograms);

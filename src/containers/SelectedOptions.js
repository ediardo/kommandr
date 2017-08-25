import React, { Component } from 'react';
import { connect } from 'react-redux';

import Option from '../components/Option';
import OptionSeparator from '../components/OptionSeparator';
import Argument from '../components/Argument';
import Space from '../components/Space';

class SelectedOptions extends Component {

  constructor(props) {
    super(props);
    this.showPopover = this.showPopover.bind(this);
  }

  showPopover() {

  }

  render() {
    const {options, program, commandLine} = this.props;
    return (
      <div className="selected-options float-left">
        <ul>
          {
            commandLine[program.id].allOptions.map((optionId, idx) => {


              return (
                <li key={optionId} className="option-item">
                  {idx > 0 && <Space key={idx} />}
                  <span className="option-container">
                    <Option option={options[optionId].longOpt} />
                    <OptionSeparator separator={commandLine[program.id].options[optionId].separator} />
                    <Argument argument={commandLine[program.id].options[optionId].value} />
                  </span>
                </li>

              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  options: state.options,
  commandLine: state.commandLine
});

export default connect(mapStateToProps)(SelectedOptions);

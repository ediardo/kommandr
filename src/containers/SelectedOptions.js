import React from 'react';
import {connect} from 'react-redux';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import selectedOptionsSelector from '../selectors/selectedOptions';

class SelectedOptions extends React.Component {

  render() {
    const {options, program, commandLine} = this.props;
    return (
      <div className="selected-options pull-left">
        <ul>
          {
            commandLine[program.id].allOptions.map(optionId => {
              const OptionPopover = (
                <Popover id="popover-trigger-focus" title={options[optionId].name}>
                 {options[optionId].description}
                </Popover>
              );
              return (

                <li key={optionId} className="option-item">
                  <OverlayTrigger placement="top" trigger={['focus', 'hover']} overlay={OptionPopover}>
                    <span className="option-">{options[optionId].longOpt}</span>
                  </OverlayTrigger>
                  <span className="option-value-separator">{commandLine[program.id].options[optionId].separator}</span>
                  <span className="option-value">{commandLine[program.id].options[optionId].value}</span>
                  <span>&nbsp;</span>
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

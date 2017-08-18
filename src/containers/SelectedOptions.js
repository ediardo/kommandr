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
            options.map(option => {
              const OptionPopover = (
                <Popover id="popover-trigger-focus" title={option.name}>
                 {option.description}
                </Popover>
              );
              return (

                <li key={option.id} className="option-item">
                  <OverlayTrigger placement="top" trigger={['focus', 'hover']} overlay={OptionPopover}>
                    <span className="option-">{option.longOpt}</span>
                  </OverlayTrigger>
                  <span className="option-value-separator">{commandLine[program.id].options[option.id].separator}</span>
                  <span className="option-value">{commandLine[program.id].options[option.id].value}</span>
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
  options: selectedOptionsSelector(state),
  commandLine: state.commandLine
});

export default connect(mapStateToProps)(SelectedOptions);

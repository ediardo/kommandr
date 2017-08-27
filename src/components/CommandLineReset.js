import React, { Component } from 'react';

import { UncontrolledTooltip } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class CommandLineReset extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick();
  }

  render() {
    const { tooltip } = this.props;

    return (
      <div>
        <span className="reset-kommandr" id="resetKommandr" onClick={this.handleClick}>
          <FontAwesome name="times" />
        </span>
        <UncontrolledTooltip placement="left" target="resetKommandr">
          {tooltip}
        </UncontrolledTooltip>
      </div>
    )
  }
}

export default CommandLineReset;

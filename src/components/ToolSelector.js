import React, { Component } from 'react';
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

class ToolSelector extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log('Component did mount');
  }

  componentWillUnmount() {
    console.log('component will unmount')

  }

  render() {
    const {programs} = this.props;
    return (
      <ButtonToolbar className="pull-right">
        <DropdownButton bsSize="small" pullRight title="Programs" id="dropdown-size-medium">
          {programs.map((program, key) =>
            <MenuItem key={key} eventKey="1">{program.name}</MenuItem>
          )}
        </DropdownButton>
      </ButtonToolbar>
    )
  }
}

export default ToolSelector;

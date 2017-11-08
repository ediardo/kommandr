import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: 0,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (

    )
  }
}

CustomDropdown.propTypes = {
  items: PropTypes.object,
  isOpen: PropTypes.bool,
};

CustomDropdown.defaultProps = {
  isOpen: false,
};

export default CustomDropdown;
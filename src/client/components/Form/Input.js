import React, { Component } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state ={
      value: this.props.value,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  }
  
  render() {
    const { value } = this.state;
    const { type, name, id, placeholder } = this.props;
    return (
      <Input {...this.props}  />      
    )
  }
}

CustomInput.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomInput;
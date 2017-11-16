import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

class CustomAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      timer: undefined,
    };
    this.toggle = this.toggle.bind(this);
    this.createTimeout = this.createTimeout.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  createTimeout() {
    const { hideTimeout } = this.props;
    this.setState({
      timer: setTimeout(() => {
        this.setState({
          isOpen: false,
        })
      }, hideTimeout)
    });
  }

  componentDidMount() {
    this.createTimeout();
  }
  
  componentWillUnmount() {
    if (this.state.timer !== undefined) {
      clearTimeout(this.timer);
    }
  }
  
  render() {
    const { isOpen } = this.state;
    const { color, text } = this.props;
   return (
        <Alert className="custom-alert" color={color} isOpen={isOpen} toggle={this.toggle} >
          {text}
        </Alert>
      )

  }
  
};

CustomAlert.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  hideTimeout: PropTypes.number,
  isOpen: PropTypes.bool,
};

CustomAlert.defaultProps = {
  color: 'info',
  hideTimeout: 5000,
  isOpen: true,
};

export default CustomAlert;
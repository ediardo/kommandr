import React, { Component } from 'react';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

class ModalSignIn extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle();
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Can I see some ID?</ModalHeader>
        <ModalBody>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Sign in</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalSignIn;

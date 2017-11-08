import React, { Component } from 'react';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

class ModalHelp extends Component {
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
        <ModalHeader toggle={this.toggle}>Help</ModalHeader>
        <ModalBody>
          Trying to get some help?
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={this.toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalHelp;

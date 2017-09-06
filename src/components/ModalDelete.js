import React, { Component } from 'react';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

class ModalDelete extends Component {
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
        <ModalHeader toggle={this.toggle}>Delete kommandr</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this kommandr?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.toggle}>Yes</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>No</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalDelete;

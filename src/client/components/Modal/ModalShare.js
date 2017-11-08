import React, { Component } from 'react';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

import Share from './Share';

class ModalShare extends Component {
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
        <ModalHeader toggle={this.toggle}>Share kommandr</ModalHeader>
        <ModalBody>
          <Share url="https://kommandr.com/12312312" embed="<script></script>" />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Exit</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalShare;

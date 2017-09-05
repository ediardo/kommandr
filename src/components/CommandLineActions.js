import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';
import SharePopover from './SharePopover';

class CommandLineActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyButtonTxt: 'Copy to clipboard',
      isOpenDeleteModal: false,
      isOpenSharePopover: false
    };
    this.handleClickCopy = this.handleClickCopy.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleSharePopover = this.toggleSharePopover.bind(this);
  }

  handleClickCopy() {
    this.props.handleClickCopy();
    this.setState({
      copyButtonTxt: 'Copied!'
    });
    setTimeout(() => {
      this.setState({
        copyButtonTxt: 'Copy to clipboard'
      });
    }, 2000);
  }

  toggleDeleteModal() {
    this.setState({
      isOpenDeleteModal: !this.state.isOpenDeleteModal
    });
  }

  toggleSharePopover() {
    this.setState({
      isOpenSharePopover: !this.state.isOpenSharePopover
    });
  }

  render() {
    const { copyButtonTxt, isOpenDeleteModal, isOpenSharePopover } = this.state;
    return (
      <div className="d-flex justify-content-end">
        <Button size="sm" className="mr-2" color="secondary" id="copyToClipboard" onClick={this.handleClickCopy} >
          <FontAwesome name="clipboard" />{` ${copyButtonTxt}`}
        </Button>
        <CustomTooltip content="Copy Kommandr" placement="top center" target="copyToClipboard" />

        <Button size="sm" className="mr-2"  color="primary" id="shareKommandr" onClick={this.toggleSharePopover}>
          <FontAwesome name="share-alt" />{' '}Share
        </Button>
        <CustomTooltip content="Share/Embed" placement="top center" target="shareKommandr" />
        <SharePopover isOpen={isOpenSharePopover} target="shareKommandr" toggle={this.toggleSharePopover} />

        <Button size="sm" color="danger" id="deleteKommandr" onClick={this.toggleDeleteModal} >
          <FontAwesome name="trash-o" />{' '}Delete
        </Button>
        <CustomTooltip content="Delete this kommandr" placement="top center" target="deleteKommandr" />
        <Modal isOpen={isOpenDeleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>Delete kommandr</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this kommandr?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleDeleteModal}>Yes</Button>{' '}
            <Button color="secondary" onClick={this.toggleDeleteModal}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default CommandLineActions;

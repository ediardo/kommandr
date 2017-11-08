import React from 'react';
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ModalDeleteKommandr = ({ isOpen, onClickConfirm, onClickCancel }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={() => onClickCancel() }>Delete kommandr</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this kommandr?
      </ModalBody>
      <ModalFooter>
        <Button outline color="secondary" onClick={() => onClickCancel() }>No</Button>
        <Button color="danger" onClick={() => onClickConfirm()}>Yes</Button>
      </ModalFooter>
    </Modal>
  )
}

ModalDeleteKommandr.propTypes = {
  isOpen: PropTypes.bool,
  onClickOK: PropTypes.func,
  onClickCancel: PropTypes.func,
}

export default ModalDeleteKommandr;

import React from 'react';
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ModalDeleteKommandr = ({ isOpen, onClickConfirm, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={() => toggle()}>
      <ModalHeader toggle={() => toggle() }>
        <FontAwesome name="trash-o" />{' '}Delete kommandr
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this Kommandr?</p>
        <p className="text-danger">This action cannot be undone</p>
      </ModalBody>
      <ModalFooter>
        <Button outline color="secondary" onClick={() => toggle() }>No</Button>
        <Button color="danger" onClick={() => onClickConfirm()}>Delete</Button>
      </ModalFooter>
    </Modal>
  )
}

ModalDeleteKommandr.propTypes = {
  isOpen: PropTypes.bool,
  onClickOK: PropTypes.func,
  toggle: PropTypes.func,
}

export default ModalDeleteKommandr;

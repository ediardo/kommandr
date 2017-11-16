import React from 'react';
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome';
import { Alert, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ModalForkKommandr = ({ isOpen, onClickConfirm, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={() => toggle()}>
      <ModalHeader toggle={() => toggle() }>
        <FontAwesome name="code-fork" />{' '}Fork Kommandr
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to fork this Kommandr?</p>
        <Alert color="info">A Fork is a copy of this Kommandr. This copy will belong to you and can edit as you need</Alert>
      </ModalBody>
      <ModalFooter>
        <Button outline color="secondary" onClick={() => toggle()}>Close</Button>
        <Button color="primary" onClick={() => onClickConfirm() }>Yes</Button>
      </ModalFooter>
    </Modal>
  )
}

ModalForkKommandr.propTypes = {
  isOpen: PropTypes.bool,
  onClickConfirm: PropTypes.func,
  toggle: PropTypes.func,
}

export default ModalForkKommandr;

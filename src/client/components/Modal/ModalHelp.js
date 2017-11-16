import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ModalHelp = ({ location, history }) => {

  const toggle = () => {
    var from = '/';
    if (location.state) 
      from = location.state.from;
    history.push(from);
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Help</ModalHeader>
      <ModalBody>
        Trying to get some help?
      </ModalBody>
      <ModalFooter>
        <Button outline color="secondary" onClick={toggle}>Exit</Button>
      </ModalFooter>
    </Modal>
  )
};

ModalHelp.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default ModalHelp;

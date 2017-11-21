import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const ModalHelp = ({ handleToggle, isOpen, match, history }) => {
  const toggle = () => {
    if (match.path === '/help') {
      history.push('/');
    } else {
      handleToggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
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
  isOpen: PropTypes.bool,
};

ModalHelp.defaultProps = {
  isOpen: true,
};

export default withRouter(ModalHelp);

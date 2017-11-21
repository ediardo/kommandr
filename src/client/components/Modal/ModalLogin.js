import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import { apiUrl } from '../../utils/';

const ModalLogin = ({ isOpen, match, history, handleToggle }) => {
  const toggle = () => {
    if (match.path === '/login') {
      history.push('/');
    } else {
      handleToggle();
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-login">
      <ModalHeader toggle={toggle}>Can I see some ID?</ModalHeader>
      <ModalBody>
        <p>Use any of your accounts below to continue</p>
        <ul className="oauth-providers">
          <li>
            <Button size="lg" href={apiUrl('/login/github')} color="link">
              <FontAwesome name="github" /> Log in with GitHub
            </Button>
          </li>
          <li>
            <Button size="lg" color="link" href={apiUrl('/login/facebook')}>
              <FontAwesome name="facebook" /> Log in with Facebook
            </Button>
          </li>
        </ul>
      </ModalBody>
      <ModalFooter>
        <Button outline color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
};

ModalLogin.propTypes = {
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
};

ModalLogin.defaultProps ={
  isOpen: true,
};

export default withRouter(ModalLogin);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import { apiUrl } from '../../utils/';

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      activeTab: '1',
      loginCredentials: {
        email: '',
        password: ''
      },
      signUpCredentials: {
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    };
    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { activeTab } = this.props;
    if (activeTab === '1') {

    } else {
      var { email, password } = this.state.signUpCredentials;
      this.props.mutate({
        variables: { email, password }
      }).then(() => this.toggle());
    }
  }

  onChangeSignUpEmail(email) {
    const { signUpCredentials } = this.state;
    this.setState({
      signUpCredentials: {
        ...signUpCredentials,
        email
      }
    });
  }

  onChangeSignUpPassword(password) {
    const { signUpCredentials } = this.state;
    this.setState({
      signUpCredentials: {
        ...signUpCredentials,
        password
      }
    });
  }

  toggle() {
    const { from } = this.props.location.state;
    this.props.history.push(from);
  }


  render() {
    const { isOpen } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={this.toggle} className="modal-login">
        <ModalHeader toggle={this.toggle}>Can I see some ID?</ModalHeader>
        <ModalBody>
          <p>Use any of your accounts below to continue</p>
          <ul className="oauth-providers">
            <li>
              <Button size="lg" href={apiUrl('/login/github')} color="link">
                <FontAwesome name="github" /> Log in with your GitHub account
              </Button>
            </li>
            <li>
              <Button size="lg" color="link" href={apiUrl('/login/facebook')}>
                <FontAwesome name="facebook" /> Log in with your Facebook account
              </Button>
            </li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}


export default ModalLogin;
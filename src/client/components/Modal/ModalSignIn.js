import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import { apiUrl } from '../../utils/';

class ModalSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.toggleTab = this.toggleTab.bind(this);
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
    this.props.toggle();
  }

  toggleTab(tab) {
    this.setState({
      activeTab: tab,
      submitAction: (tab === '1') ? 'Log in' : 'Register new account'
    });

  }

  render() {
    const { isOpen } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Can I see some ID?</ModalHeader>
        <ModalBody>
        <a href={apiUrl('/login/github')}>
          <Button size="big" color="primary" >
            <FontAwesome name="github" /> Log in with your GitHub account
          </Button>
        </a>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mutation = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default graphql(mutation)(ModalSignIn);

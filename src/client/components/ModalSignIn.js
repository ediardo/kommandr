import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

import FormSignUp from './FormSignUp';

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

  /*
  onChangePasswordConfirm(passwordConfirmation) {
    const { signUpCredentials } = this.state;
    this.setState({
      signUpCredentials: {
        ...signUpCredentials,
        passwordConfirmation
      }
    });
  }
  */

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
    const { activeTab, submitAction } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Can I see some ID?</ModalHeader>
        <ModalBody>
        <a href="http://api.kommandr.com:5001/login/github">
          <Button size="big" color="primary" >
            <FontAwesome name="github" /> Log in with your GitHub account
          </Button>
        </a>
         { /*
          <Nav tabs>
            <NavItem>
              <NavLink className={classNames({ active: activeTab === '1' })} onClick={() => this.toggleTab('1') }>
                Log in
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classNames({ active: activeTab === '2' })} onClick={() => this.toggleTab('2') }>
                Register
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h5>Social media logins</h5>
              <hr />
              <Form>
                <FormGroup>
                  <Label for="loginEmailUsername">Email/Username</Label>
                  <Input type="text" name="loginEmailUsername" id="loginEmailUsername" />
                  <Label for="loginPassword">Password</Label>
                  <Input type="text" name="loginPassword" id="loginPassword" />
                </FormGroup>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <FormSignUp handleOnChangeEmail={this.onChangeSignUpEmail} handleOnChangePassword={this.onChangeSignUpPassword} />
            </TabPane>
          </TabContent>
         */}
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

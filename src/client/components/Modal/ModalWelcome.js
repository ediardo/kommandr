import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';

import {
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupButton,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

import FontAwesome from 'react-fontawesome';

import CheckUsername from '../Form/CheckUsername';
import CustomTooltip from '../CustomTooltip';
import updateUser from '../../queries/updateUser';

const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){3,38}$/i;

class ModalWelcome extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = this.props.data;
    console.log(currentUser);
    this.state = {
      username: currentUser.username,
      usernameValid: currentUser.username.match(usernameRegex),
      password: '',
      passwordValid: currentUser.username > 5,
      revealPassword: false,
      isOpen: (currentUser) ? !currentUser.hasSeenWelcome : false,
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.revealPassword = this.revealPassword.bind(this);
  }

  onChangeUsername(e) {
    const { value } = e.target;
    this.setState({
      username: value,
      usernameValid: value.match(usernameRegex)
    });    
  }

  onChangePassword(e) {
    const { value } = e.target;
    this.setState({
      password: value.trim(),
      passwordValid: value.trim().length > 5
    });
  }

  submit() {
    const { username, password } = this.state;
    this.props.updateUser({
      variables: { username, password }
    }).then(({data}) =>{
      console.log(data);
    }).catch(error => {
      console.log('there was an error ', error);
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  revealPassword() {
    this.setState({
      revealPassword: !this.state.revealPassword
    });
  }

  render() {
    const { isOpen, username, usernameValid, password, passwordValid, revealPassword } = this.state;
    const { currentUser } = this.props.data;
    if (currentUser === undefined || currentUser === null) return null;
    const { name, email, externalAvatarUlr } = currentUser;
    console.log(this.state.username);
    return (
      <Modal isOpen={isOpen} toggle={this.toggle} backdrop="static">
        <ModalHeader toggle={this.toggle}>Nice to meet you, { name }</ModalHeader>
        <ModalBody>
          <p>We've fetched and stored basic public information from your GitHub account into our database,
          but there's one last step to complete: a strong password.
          </p>
          <FormGroup>
            <Label for="username">Username</Label>
            <InputGroup>
              <Input type="text" name="username" id="username" placeholder="Your username" value={username} onChange={this.onChangeUsername} />
              <InputGroupAddon>
                { usernameValid
                  ? <CheckUsername currentUsername={currentUser.username} newUsername={username} />
                  : <span className="text-danger">invalid</span>}
              </InputGroupAddon>
            </InputGroup>
            
            <Label for="password">Password</Label>              
            <InputGroup>
              <Input type={(revealPassword) ? 'text' : 'password'} name="password" id="password" placeholder="Type a password" value={password} onChange={this.onChangePassword} minLength="3"/>
              <InputGroupAddon>
                <FontAwesome name={(passwordValid) ? 'check' : 'times'} id="passwordValid" />
              </InputGroupAddon>
              <CustomTooltip content={(passwordValid) ? 'Your password is valid' : 'Reveal password' } placement="top center" target="passwordValid" />                  
              <InputGroupButton>
                <Button color="secondary" onClick={this.revealPassword} id="revealPassword" >
                  <FontAwesome name={(revealPassword) ? 'eye-slash' : 'eye'}/>
                </Button>
                <CustomTooltip content={(revealPassword) ? 'Hide password' : 'Reveal password' } placement="top center" target="revealPassword" />                  
              </InputGroupButton>
            </InputGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.submit} disabled={!(usernameValid && passwordValid)} >Save changes</Button>
          <Button color="secondary" onClick={this.toggle}>I'll do this later</Button>
        </ModalFooter>
      </Modal>
    )
  }
}


export default compose(
  graphql(updateUser, { name: 'updateUser' }),
)(ModalWelcome);
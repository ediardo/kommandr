import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import {
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  FormFeedback,
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
import updateUser from '../../graphql/mutations/updateUser.gql';
import currentUser from '../../graphql/queries/currentUser.gql';

const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){3,38}$/i;

const ModalMessage = ({ isOpen, toggle }) => { 
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>You are all set!</ModalHeader>
      <ModalBody>
        <p>Welcome to Kommandr. I hope you find it useful :)</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Ok</Button>
      </ModalFooter>
    </Modal>
  )
};

ModalMessage.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

class ModalWelcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameValid: false,
      password: '',
      passwordValid: false,
      revealPassword: false,
      isOpen: false,
      showMessage: false,
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.revealPassword = this.revealPassword.bind(this);
  }

  onChangeUsername(e) {
    const username = e.target.value.trim();
    this.setState({
      username,
      usernameValid: username.match(usernameRegex)
    });    
  }

  onChangePassword(e) {
    const password = e.target.value;
    this.setState({
      password,
      passwordValid: password.trim().length > 5
    });
  }

  submit() {
    const { username, password } = this.state;
    this.props.updateUser({
      variables: { username, password }
    }).then(({data}) =>{
      this.showMessage();
    }).catch(error => {
      console.log('there was an error ', error);
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showMessage() {
    this.setState({
      showMessage: !this.state.showMessage
    });
  }

  revealPassword() {
    this.setState({
      revealPassword: !this.state.revealPassword
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loading, currentUser } = nextProps.data;
    if (!loading && currentUser && !currentUser.hasSeenWelcome) {
      this.setState({
        isOpen: true,
        username: currentUser.username,
        usernameValid: currentUser.username.match(usernameRegex),
      });
    }
  }

  render() {
    const { 
      isOpen,
      username,
      usernameValid,
      password,
      passwordValid,
      showMessage,
      revealPassword,
    } = this.state;
    const { loading, currentUser } = this.props.data;
    if (loading) return null;
    if (!currentUser) return null;
    const {  name } = currentUser;
    return (
      <Modal isOpen={isOpen} toggle={this.toggle} backdrop="static">
        <ModalHeader toggle={this.toggle}>Nice to meet you, { name }</ModalHeader>
        <ModalBody>
          <p>We've fetched and stored basic public information from your GitHub account into our database,
          but there's one last step to complete: a strong password.</p>
          <FormGroup>
            <Label for="username">Username</Label>
            <InputGroup>
              <Input value={username} type="text" name="username" id="username" placeholder="Username" onChange={this.onChangeUsername} />
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
  
              <InputGroupButton>
                <Button color="secondary" onClick={this.revealPassword} id="revealPassword" >
                  <FontAwesome name={(revealPassword) ? 'eye-slash' : 'eye'}/>
                </Button>
                <CustomTooltip content={(revealPassword) ? 'Hide password' : 'Reveal password' } placement="top" target="revealPassword" />                  
              </InputGroupButton>
            </InputGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button outline color="secondary" onClick={this.toggle}>I'll do this later</Button>
          <Button color="primary" onClick={this.submit} disabled={!(usernameValid && passwordValid)} >Save changes</Button>
          <ModalMessage isOpen={showMessage} toggle={this.toggle} />
          
        </ModalFooter>
      </Modal>
    )
  }
};

ModalWelcome.propTypes = {
  data: PropTypes.object,
};

export default compose(
  graphql(updateUser, { name: 'updateUser' }),
  graphql(currentUser),
)(ModalWelcome);
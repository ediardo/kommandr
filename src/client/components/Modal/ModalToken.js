import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import {
  Alert,
  Button,
  FormGroup,
  Label,
  Fade,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import _ from 'lodash';

import addToken from '../../graphql/mutations/addToken.gql';
import currentUser from '../../graphql/queries/currentUser.gql';


class ModalToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name,
      nameIsValid: false,
      tokenGenerated: false,
      tokenHash: '',
      isOpen: this.props.isOpen,
    };
    this.toggle = this.toggle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveToken = this.saveToken.bind(this);
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState({ 
      name,
      nameIsValid: name.trim().length > 0
     });
  }

  saveToken() {
    const { name } = this.state;
    const variables = { 
      name: name.trim(),
    };

    this.props.addToken({
      variables,
      refetchQueries: [
        { query: currentUser },
      ],
    }).then(({ data }) => {
      const { tokenHash } = data.token;
      this.setState({
        tokenGenerated: true,
        tokenHash
      });
    }).catch(error => {
      console.log('there was an error ', error);
    });
     
  }

  toggle() {
    this.props.history.push({
      pathname: '/settings/client'
    });
  }

  render() {
    const { isOpen, data: { loading } } = this.props;
    if (loading) return <p>Loading...</p>;
    const { name, tokenHash, tokenGenerated, nameIsValid } = this.state;
    return (
      <Modal isOpen={isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Create new Token</ModalHeader>
        <ModalBody>
          <p>Generate a new token to connect Kommandr client with your account. You should store your tokens in a safe place</p>
          <FormGroup>
            <Label for="tokenName">Name</Label>
            <Input
              type="text"
              id="tokenName"
              placeholder="e.g. My work computer"
              value={name}
              onChange={this.onChangeName}
              valid={nameIsValid}
              disabled={tokenGenerated}
            />
          </FormGroup>
          <Fade in={tokenGenerated}>
            <FormGroup>
              <Label for="tokenHash">Your new Token!</Label>
              <Input type="textarea" id="tokenHash" disabled={true} value={tokenHash} placeholder="Your new token will appear here" />
            </FormGroup>
            <Alert color="info">Copy and store your token in a secure place. We will NEVER show this token again.</Alert>
          </Fade>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" outline onClick={this.toggle}>Close</Button>
          <Button color="primary" onClick={this.saveToken} disabled={tokenGenerated || !nameIsValid} >Create token</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ModalToken.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
};

export default compose(
  graphql(addToken, { name: 'addToken' }),
  graphql(currentUser),
)(ModalToken);
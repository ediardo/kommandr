import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import {
  Button,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
  FormFeedback,
  FormText,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import _ from 'lodash';

import addCollection from '../../graphql/mutations/addCollection.gql';
import currentUser from '../../graphql/queries/currentUser.gql';

const initialState = {
  name: '',
  nameIsUnique: undefined,
  matchPattern: '',
  matchesFound: 0,
  nameIsValid: false,
  description: '',
};

class ModalAddCollection extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.toggle = this.toggle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMatchPattern = this.onChangeMatchPattern.bind(this);
    this.saveCollection = this.saveCollection.bind(this);
  }

  onChangeName(e) {
    const value = e.target.value;
    const { allCollections } = this.props.data.currentUser;
    let nameIsUnique = _.find(allCollections, (o) => o.name.toLowerCase() === value.toLowerCase()) === undefined
    this.setState({ 
      name: value,
      nameIsUnique,
      nameIsValid: value.trim().length > 0
     });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState({ description });
  }

  onChangeMatchPattern(e) {
    const matchPattern = e.target.value;
    const { allKommandrs } = this.props.data.currentUser;
    let matchesFound = [];
    if (matchPattern.length > 0) matchesFound = _.filter(allKommandrs, (o) => o.cli.match(matchPattern));
    this.setState({ matchPattern, matchesFound: matchesFound.length });
  }

  saveCollection() {
    const { name, description, matchPattern } = this.state;
    this.props.addCollection({
      variables: {
        name: name.trim(),
        description: description.trim(),
        matchPattern
      },
      refetchQueries: [
        { query: currentUser }
      ],
    }).then(({ data }) => {
      this.toggle();
      this.setState({ ...initialState});
    }).catch(error => {
      console.log('there was an error ', error);
    });
  }
  toggle() {
    this.props.toggle();
  }

  render() {
    const { isOpen, data: { loading } } = this.props;
    const { nameIsValid, nameIsUnique, name, description, matchPattern, matchesFound } = this.state;
    
    if (loading) return null;
    return (
      <Modal isOpen={isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Add Collection</ModalHeader>
        <ModalBody>
          <p>You can organize your Kommandrs by storing them into Collections.</p>
          <FormGroup>
            <Label for="collectionName">Name</Label>
            <Input type="text" valid={nameIsUnique} id="collectionName" placeholder="e.g. My git commands" value={name} onChange={this.onChangeName} />
            { nameIsUnique === false && <FormFeedback className="text-danger">You already have a collection with this name</FormFeedback> }
          </FormGroup>

          <Label for="collectionMatchPattern">Group Kommanders matching a regex</Label>
          <InputGroup>
            <InputGroupAddon>/</InputGroupAddon>
            <Input type="text" id="collectionMatchPattern" placeholder="git commit" value={matchPattern} onChange={this.onChangeMatchPattern} />
            <InputGroupAddon>/g</InputGroupAddon>
          </InputGroup>  
          <FormText color="muted">{matchesFound} Kommandrs matched your regex</FormText>
          
          <FormGroup>
            <Label for="collectionDescription">Description</Label>
            <Input type="textarea" id="collectionDescription" placeholder="Describe what this collection is about" value={description} onChange={this.onChangeDescription} />         
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" outline onClick={this.toggle}>Close</Button>
          <Button color="primary" onClick={this.saveCollection} disabled={!nameIsValid || !nameIsUnique} >Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

ModalAddCollection.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
};

export default compose(
  graphql(addCollection, { name: 'addCollection' }),
  graphql(currentUser),
)(ModalAddCollection);
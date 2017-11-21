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
import updateCollection from '../../graphql/mutations/updateCollection.gql';
import currentUser from '../../graphql/queries/currentUser.gql';

const nameIsValid = name => {
  return name.trim().length > 0;
}

const nameIsUnique = (allCollections = [], newName = '', oldName = '') => {
  if (newName === oldName || allCollections.length === 0) return true;
  return _.find(allCollections, (o) => o.name.toLowerCase() === newName.toLowerCase()) === undefined
}

const matchesFoundWithPattern = (allKommandrs = [], pattern) => {
  return _.filter(allKommandrs, (o) => o.cli.match(pattern));
}

class ModalCollection extends Component {
  constructor(props) {
    super(props);
    var name = '', description = '', matchRegex = '', isEnabled = true, matchAllTime = true;
    if (props.mode === 'view') {
      var { name, description, matchRegex, isEnabled, matchAllTime } = props.collection;
    }
    this.state = {
      name,
      nameIsUnique: nameIsUnique([], name, name),
      matchRegex,
      matchesFound: 0,
      nameIsValid: nameIsValid(name),
      isEnabled,
      matchAllTime,
      description,
      isOpen: this.props.isOpen,
    };
    this.toggle = this.toggle.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMatchRegex = this.onChangeMatchRegex.bind(this);
    this.onChangeIsEnabled = this.onChangeIsEnabled.bind(this);
    this.onChangeMatchAllTime = this.onChangeMatchAllTime.bind(this);
    this.saveCollection = this.saveCollection.bind(this);
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState({ 
      name,
      nameIsUnique: nameIsUnique(this.props.data.currentUser.allCollections, name),
      nameIsValid: nameIsValid(name),
     });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState({ description });
  }

  onChangeMatchRegex(e) {
    const matchRegex = e.target.value;
    let matchesFound = (matchRegex.length > 0) ? matchesFoundWithPattern(this.props.data.currentUser.allKommandrs, matchRegex) : [];
    this.setState({
      matchRegex,
      matchesFound: matchesFound.length
    });
  }

  onChangeIsEnabled(e) {
    this.setState({
      isEnabled: e.target.checked,
    });
  }

  onChangeMatchAllTime(e) {
    this.setState({
      matchAllTime: e.target.vacheckedlue,
    });
  }

  saveCollection() {
    const { name, description, matchRegex, isEnabled, matchAllTime } = this.state;
    const { mode } = this.props;
    const variables = { 
      name: name.trim(),
      description: description.trim(),
      matchRegex,
      isEnabled,
      matchAllTime,
    };

    if (mode === 'view') {
      this.props.updateCollection({
        variables: {
          ...variables,
          id: this.props.collection.id,
        },
        refetchQueries: [
          { query: currentUser },
        ]
      }).then(({ data }) => {
        this.toggle(undefined, { flash: { color: 'success', 'text': 'Collection was updated successfully!' } });
      });
    } else {
      this.props.addCollection({
        variables,
        refetchQueries: [
          { query: currentUser },
        ],
      }).then(({ data }) => {
        this.toggle(undefined, { flash: { color: 'success', 'text': 'Collection was created successfully!' } });
      }).catch(error => {
        console.log('there was an error ', error);
      });
    } 
  }

  toggle(e, state = undefined) {
    const { username } = this.props.match.params;
    this.props.history.push({
      pathname: `/u/${username}/collections`,
      state
    });
  }

  render() {
    const { mode, isOpen, data: { loading } } = this.props;
    if (loading) return <p>Loading...</p>;
    const { nameIsValid, nameIsUnique, name, description, matchRegex, matchesFound, isEnabled, matchAllTime } = this.state;
    const modalTitle = (mode === 'view') ? 'Edit Collection' : 'Add Collection';
    return (
      <Modal isOpen={isOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          <p>You can organize your Kommandrs by storing them into Collections.</p>
          <FormGroup>
            <Label for="collectionName">Name</Label>
            <Input type="text" valid={nameIsUnique} id="collectionName" placeholder="e.g. My git commands" value={name} onChange={this.onChangeName} />
            { mode === 'view' && name !== this.props.collection.name && nameIsUnique === false && <FormFeedback className="text-danger">You already have a collection with this name</FormFeedback> }
          </FormGroup>

          <Label for="collectionmatchRegex">Group Kommanders matching a regex</Label>
          <InputGroup>
            <InputGroupAddon>/</InputGroupAddon>
            <Input type="text" id="collectionmatchRegex" placeholder="git commit" value={matchRegex} onChange={this.onChangeMatchRegex} />
            <InputGroupAddon>/g</InputGroupAddon>
          </InputGroup>  
          <Label check>
            <Input type="checkbox" id="matchAllTime" checked={matchAllTime} onChange={this.onChangeMatchAllTime} />{' '}Analize Kommandrs created since beggining of time
          </Label>
          {matchAllTime && <FormText color="muted">{matchesFound} Kommandrs matched your regex</FormText>}
          
          <FormGroup>
            <Label for="collectionDescription">Description</Label>
            <Input type="textarea" id="collectionDescription" placeholder="Describe what this collection is about" value={description} onChange={this.onChangeDescription} />         
          </FormGroup>

          <FormGroup>
            <Label check>
              <Input type="checkbox" id="isEnabled" checked={isEnabled} onChange={this.onChangeIsEnabled}/>{' '}Enabled
            </Label>
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

ModalCollection.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
};

export default compose(
  graphql(addCollection, { name: 'addCollection' }),
  graphql(updateCollection, { name: 'updateCollection' }),
  graphql(currentUser),
)(ModalCollection);
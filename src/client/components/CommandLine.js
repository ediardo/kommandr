import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { compose, graphql } from 'react-apollo';
import { Col, Media, Row } from 'reactstrap';
import CodeMirror from 'react-codemirror';

import Actions from './Kommandr/KommandrActions';
//import Description from './CommandLineDescription';
//import Loading from './Loading';
import Stats from './Kommandr/KommandrStats';
//import Title from './CommandLineTitle';

import addKommandr from '../graphql/mutations/addKommandr.gql';
import forkKommandr from '../graphql/mutations/forkKommandr.gql';
import deleteKommandr from '../graphql/mutations/deleteKommandr.gql';
import updateKommandr from '../graphql/mutations/updateKommandr.gql';
import kommandrById from '../graphql/queries/kommandrById.gql';
import allKommandrs from '../graphql/queries/allKommandrs.gql';
import currentUser from '../graphql/queries/currentUser.gql';

import 'codemirror/addon/mode/simple';
import 'codemirror/mode/shell/shell';

const initialState = {
  title: '',
  editedTitle: false,
  cli: '',
  editedCli: false,
  description: '',
  editedDescription: false,
  editing: false,
};

class CommandLine extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = initialState;
    this.flagKommandr = this.flagKommandr.bind(this);
    this.forkKommandr = this.forkKommandr.bind(this);
    this.saveKommandr = this.saveKommandr.bind(this);
    this.deleteKommandr = this.deleteKommandr.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCli = this.setCli.bind(this);
  }

  saveKommandr() {
    const { title, cli, description } = this.state;
    const { mode } = this.props;
    if (mode === 'create') {
      this.props.addKommandr({
        variables: { title, cli, description },
        refetchQueries: [
          { query: allKommandrs }
        ]
      }).then(({ data }) => {
        const { hashId } = data.kommandr;
        this.props.history.push(`/k/${hashId}`);      
      }).catch(error => {
        console.log('there was an error ', error);
      });
    } else {
      const { id } = this.props.data.kommandr;
      const { editedCli, editedTitle, editedDescription } = this.state;
      var updateFields = {};
      updateFields.id = id;
      updateFields.title = (editedTitle) ? title : this.props.data.kommandr.title;
      updateFields.cli = (editedCli) ? cli : this.props.data.kommandr.cli;
      updateFields.description = (editedDescription) ? description : this.props.data.kommandr.description;
      this.props.updateKommandr({
        variables: updateFields,
        refetchQueries: [{
          query: kommandrById,
          variables: { id },
        }]
      });
    }
  }

  forkKommandr() {
    const { id } = this.props.data.kommandr;
    this.props.forkKommandr({
      variables: { id },
      refetchQueries: [
        { query: currentUser },
        { query: allKommandrs },
      ]
    }).then(({ data }) => {
      const { hashId } = data.kommandr;
      this.props.history.push(`/k/${hashId}`);      
    }).catch(error => {
      console.log('there was an error ', error);
    });
  }

  deleteKommandr() {
    const { id } = this.props.data.kommandr;
    this.props.deleteKommandr({
      variables: { id },
      refetchQueries: [
        { query: currentUser },
        { query: allKommandrs },
      ]
    }).then(({ data }) => {
      const { id } = data.kommandr;
      if (id) {
        this.setState(initialState);
        this.props.history.push('/');
      }
    })
  }

  flagKommandr() {
    console.log('flag');
  }

  setCli(cli) {
    console.log('Cli: ', cli);
    this.setState({
      cli:  cli,
      editedCli: true,
      editing: true
    });
  }

  setDescription(e) {
    console.log('Description: ', e.target.value);
    this.setState({
      description: e.target.value,
      editedDescription: true,
      editing: true
    });
  }

  setTitle(e) {
    console.log('Title: ', e.target.value);
    this.setState({
      title: e.target.value,
      editedTitle: true,
      editing: true
    });
  }

  render() {
    const { mode, data: { loading } }=  this.props;
    if (loading) {
      return <span>Loading...</span>;
    }
    const { data: { kommandr, currentUser } } = this.props;
    if (mode === 'view') {
      if (kommandr === null) return <span>Looks like this kommandr does not exists</span>;
      var { id, title, cli, description, author } = kommandr;
    } else if (mode === 'create') {
      var { title, cli, description } = this.state, id = this.props.location.key;
      author = currentUser;
    }
    if (currentUser === null || (mode === 'view' && author.username === 'anon')) {
      var isAnonymous = true;
    }

    return (
      <span key={id}>
        <div className="kommandr-title">
          <input className="editable-input" type="text" defaultValue={title} onChange={this.setTitle} placeholder="Name this kommandr" />
        </div>
        <Row className="mb-2">
          <Col xs="12" sm="8">
            <Stats mode={mode} kommandrId={id} data={{}} />
          </Col>
          <Col xs="12" sm="4">
            <Actions mode={mode} author={author} onSave={this.saveKommandr} onDelete={this.deleteKommandr} onFlag={this.flagKommandr} onFork={this.forkKommandr} />
          </Col>
        </Row>
        <div className="kommandr mb-2">
          <CodeMirror value={cli} onChange={this.setCli} options={{lineNumbers: true, mode: "shell"}} />
        </div>
        <Row className="kommandr-info">
          <Col xs="12" className="kommandr-description">  
            <Media>
              <Media left href="#">
                <div className="user-avatar sm-avatar placeholder">
                  { isAnonymous
                    ? ''
                    : <img src={author.externalAvatarUrl} alt="profile" />
                  }
                </div>
              </Media>
              <Media body className="ml-2">
                <span className="username">
                  { isAnonymous
                    ? 'anonymous user'
                    : <Link to={`/u/${author.username}`}>{author.username}</Link> 
                  }
                </span>
                <div>
                  <textarea className="editable-input" defaultValue={description} onChange={this.setDescription} placeholder="Enter a description..." />                
                </div>
              </Media>
            </Media>
          </Col>
        </Row>
      </span>
    );
  }
}

export default compose(  
  graphql(currentUser, {
    props: ({ ownProps, data }) => ({
      mode: (ownProps.match.params.hasOwnProperty('id')) ? 'view' : 'create',
      data
    })   
  }),
  graphql(kommandrById, {
    options: (props) => ({ variables: { id: props.match.params.id } }),
    skip: (ownProps) => !ownProps.match.params.hasOwnProperty('id')    
  }),
  graphql(addKommandr, { name: 'addKommandr' }),
  graphql(updateKommandr, { name: 'updateKommandr' }),
  graphql(deleteKommandr, { name: 'deleteKommandr' }),
  graphql(forkKommandr, { name: 'forkKommandr' }),
)(CommandLine);
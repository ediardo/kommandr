import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { Col, Media, Row } from 'reactstrap';
import CodeMirror from 'react-codemirror';

import { Actions, ActionButton } from './Actions';

import { Stats, StatFork, StatView, StatComment, StatStar } from './Stats/';
import { ModalDeleteKommandr } from './Modal';

import addKommandr from '../graphql/mutations/addKommandr.gql';
import forkKommandr from '../graphql/mutations/forkKommandr.gql';
import deleteKommandr from '../graphql/mutations/deleteKommandr.gql';
import updateKommandr from '../graphql/mutations/updateKommandr.gql';
import starKommandr from '../graphql/mutations/starKommandr.gql';
import unstarKommandr from '../graphql/mutations/unstarKommandr.gql';
import kommandrById from '../graphql/queries/kommandrById.gql';
import allKommandrs from '../graphql/queries/allKommandrs.gql';
import currentUser from '../graphql/queries/currentUser.gql';
import searchKommandr from '../graphql/queries/searchKommandr.gql';

import 'codemirror/addon/display/placeholder.js';
import 'codemirror/addon/display/autorefresh.js';
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
  isOpenModalDelete: false,
  isOpenModalReport: false,
};

class CommandLine extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.flagKommandr = this.flagKommandr.bind(this);
    this.forkKommandr = this.forkKommandr.bind(this);
    this.saveKommandr = this.saveKommandr.bind(this);
    this.deleteKommandr = this.deleteKommandr.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCli = this.setCli.bind(this);
    this.starKommandr = this.starKommandr.bind(this);
    this.unstarKommandr = this.unstarKommandr.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
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
      }).then(({ data: { kommandr } }) => {
        this.props.history.push(`/k/${kommandr.id}`);      
      }).catch(error => {
        console.log('there was an error ', error);
      });
    } else {
      const { id } = this.props.kommandr.kommandr;
      const { editedCli, editedTitle, editedDescription } = this.state;
      var updateFields = {};
      updateFields.id = id;
      updateFields.title = (editedTitle) ? title : this.props.kommandr.kommandr.title;
      updateFields.cli = (editedCli) ? cli : this.props.kommand.kommandr.cli;
      updateFields.description = (editedDescription) ? description : this.props.kommandr.kommandr.description;
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
    if (this.props.mode === 'view' && this.props.data.currentUser) {
      const { id } = this.props.kommandr.kommandr;
      this.props.forkKommandr({
        variables: { id },
        refetchQueries: [
          { query: currentUser },
          { query: allKommandrs },
          { query: searchKommandr },
        ]
      }).then(({ data: { kommandr } }) => {
        this.props.history.push(`/k/${kommandr.id}`);      
      }).catch(error => {
        console.log('there was an error ', error);
      });
    }
  }

  deleteKommandr() {
    const { id } = this.props.kommandr.kommandr;
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

  starKommandr() {
    console.log('Star');
  }

  unstarKommandr() {

  }

  flagKommandr() {
    console.log('flag');
  }

  setCli(cli) {
    this.setState({
      cli:  cli,
      editedCli: true,
      editing: true
    });
  }

  setDescription(e) {
    this.setState({
      description: e.target.value,
      editedDescription: true,
      editing: true
    });
  }

  setTitle(e) {
    this.setState({
      title: e.target.value,
      editedTitle: true,
      editing: true
    });
  }
  
  toggleModalDelete() {
    this.setState({ isOpenModalDelete: !this.state.isOpenModalDelete });
  }

  render() {
    const { mode, kommandr, data: { loading, currentUser } } =  this.props;
    const { isOpenModalDelete } = this.state;
    if (loading || (kommandr && kommandr.loading))  return <span>Loading...</span>;
    var ownedByCurrentUser = false;
    if (mode === 'view') {
      console.log(kommandr);
      if (kommandr.kommandr === null) return <span>Looks like this kommandr does not exists</span>;
      var { id, title, cli, description, author, totalStars, totalComments, totalForks, totalViews } = kommandr.kommandr;
      ownedByCurrentUser = currentUser && author.id === currentUser.id;
    } else if (mode === 'create') {
      var { title, cli, description } = this.state, id = this.props.location.key;
      author = currentUser;
    }
    if (currentUser === null || (mode === 'view' && author.username === 'anon')) {
      var isAnonymous = true;
    }

    const codemirrorOpts = {
      lineNumbers: false,
      mode: "shell",
      autoRefresh: true,
      lineWrapping: true,
      height: 'auto',
      viewportMargin: Infinity,
      placeholder: 'Type a command here...',
      autofocus: true,
    };
 
    return (
      <span key={id}>
        <div className="kommandr-title mb-2">
          <input className="editable-input" type="text" defaultValue={title} onChange={this.setTitle} placeholder="Name this kommandr" />
        </div>
        <div className="mb-3 d-flex justify-content-end">
          <Stats>
            <StatView value={totalViews} />
            <StatComment value={totalComments} />
            <StatFork value={totalForks} onClick={this.forkKommandr} disabled={(mode === 'create' || ownedByCurrentUser)} />
            <StatStar value={totalStars} onClick={this.starKommandr} />
          </Stats>
          <Actions className="ml-auto">
            {mode === 'create' 
              ? <ActionButton text="create" name="add" onClick={this.saveKommandr} disabled={cli.length === 0 || title.length === 0} />
              : null
            }
            {mode === 'view' && ownedByCurrentUser
              ? <ActionButton text="update" name="update" onClick={this.saveKommandr} />
              : null
            }
            {mode === 'view' && !ownedByCurrentUser 
              ? <ActionButton text="report" name="report" onClick={() => console.log('click')} />
              : null
            }
            {mode === 'view' && ownedByCurrentUser
              ? <ActionButton text="delete" name="delete" onClick={this.toggleModalDelete} />
              : null
            }
          </Actions>
        </div>
        <div className="kommandr mb-2">
          <CodeMirror value={cli} onChange={this.setCli} options={codemirrorOpts} />
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
        <ModalDeleteKommandr isOpen={isOpenModalDelete} onClickConfirm={this.deleteKommandr} onClickCancel={this.toggleModalDelete} />
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
    name: 'kommandr',
    options: (props) => ({ variables: { id: props.match.params.id } }),
    skip: (ownProps) => !ownProps.match.params.hasOwnProperty('id')    
  }),
  graphql(addKommandr, { name: 'addKommandr' }),
  graphql(updateKommandr, { name: 'updateKommandr' }),
  graphql(deleteKommandr, { name: 'deleteKommandr' }),
  graphql(forkKommandr, { name: 'forkKommandr' }),
)(CommandLine);
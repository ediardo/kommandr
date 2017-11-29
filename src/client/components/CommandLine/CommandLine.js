import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { Input, Fade } from 'reactstrap';
import CodeMirror from 'react-codemirror';
import classNames from 'classnames';
import ReactAlert from 'react-s-alert';

import AuthenticatedOnly from '../AuthenticatedOnly';
import { Actions, ActionButton } from './../Actions';
import CommandLineAuthor from './CommandLineAuthor';
import CommandLineComments from './CommandLineComments';
import { Stats, StatFork, StatView, StatComment, StatStar } from '../Stats/';
import { ModalDeleteKommandr, ModalShareKommandr, ModalReportKommandr, ModalForkKommandr } from '../Modal';
import { AddComment, CommentList } from '../Comment/';
import addKommandr from '../../graphql/mutations/addKommandr.gql';
import forkKommandr from '../../graphql/mutations/forkKommandr.gql';
import deleteKommandr from '../../graphql/mutations/deleteKommandr.gql';
import updateKommandr from '../../graphql/mutations/updateKommandr.gql';
import reportKommandr from '../../graphql/mutations/reportKommandr.gql';
import starKommandr from '../../graphql/mutations/starKommandr.gql';
import addComment from '../../graphql/mutations/addComment.gql';
import allKommandrs from '../../graphql/queries/allKommandrs.gql';
import currentUser from '../../graphql/queries/currentUser.gql';
import searchKommandr from '../../graphql/queries/searchKommandr.gql';
import kommandrById from '../../graphql/queries/kommandrById.gql';

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
  comment: '',
  isOpenModalDelete: false,
  isOpenModalReport: false,
  isOpenModalShare: false,
  isOpenModalFork: false,
};

const codemirrorOpts = {
  lineNumbers: false,
  mode: "shell",
  autoRefresh: true,
  lineWrapping: true,
  height: 'auto',
  viewportMargin: Infinity,
  placeholder: 'Type a command here...',
  autofocus: true,
  readOnly: false,
};

class CommandLine extends Component {
  constructor(props) {
    super(props);
    const { mode } = this.props;
    this.state = {
      ...initialState,
      title: (mode === 'view') ? this.props.kommandr.title : '',
      description: (mode === 'view') ? this.props.kommandr.description: '',
      cli: (mode === 'view') ? this.props.kommandr.cli : '',
    };
    this.reportKommandr = this.reportKommandr.bind(this);
    this.forkKommandr = this.forkKommandr.bind(this);
    this.saveKommandr = this.saveKommandr.bind(this);
    this.deleteKommandr = this.deleteKommandr.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCli = this.setCli.bind(this);
    this.starKommandr = this.starKommandr.bind(this);
    this.setComment =  this.setComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalShare = this.toggleModalShare.bind(this);
    this.toggleModalReport = this.toggleModalReport.bind(this);
    this.toggleModalFork = this.toggleModalFork.bind(this);
  }

  saveKommandr() {
    const { title, cli, description } = this.state;
    const { mode } = this.props;
    if (mode === 'add') {
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
      const { id } = this.props.kommandr;
      /*
      var updateFields = {};
      updateFields.id = id;
      updateFields.title = (editedTitle) ? title : this.props.kommandr.kommandr.title;
      updateFields.cli = (editedCli) ? cli : this.props.kommand.kommandr.cli;
      updateFields.description = (editedDescription) ? description : this.props.kommandr.kommandr.description;
      */
      this.props.updateKommandr({
        variables: { id, title, cli, description },
        refetchQueries: [
          { query: currentUser },
          { 
            query: kommandrById,
            variables: {
              id
            }
          }
        ]
      }).then(({ data: { kommandr } }) => {
        ReactAlert.success('You have updated your Kommandr');  
      });
    }
  }

  forkKommandr() {
    const { id } = this.props.kommandr;
    this.props.forkKommandr({
      variables: { id },
      refetchQueries: [
        { query: currentUser },
        { query: allKommandrs },
        { query: searchKommandr },
      ]
    }).then(({ data }) => {
      const { id } = data.kommandr;
      ReactAlert.success('You have forked a new Kommandr');
      this.props.history.push(`/k/${id}`);      
    }).catch(error => {
      ReactAlert.error('There was an error while we try to Fork this Kommandr');
    });
  }

  deleteKommandr() {
    const { id } = this.props.kommandr;
    this.props.deleteKommandr({
      variables: { id },
      refetchQueries: [
        { query: currentUser },
      ]
    }).then(({ data }) => {
      const { id } = data.kommandr;
      if (id) {
        ReactAlert.success('You have successfully deleted a Kommandr');
        this.props.history.push('/');
      }
    })
  }

  starKommandr() {
    const { id } = this.props.kommandr;
    this.props.starKommandr({
      variables: { id },
      refetchQueries: [
        { query: currentUser },
        { 
          query: kommandrById,
          variables: {
            id
          }
        }
      ]
    }).then(({ data }) => {
      const { id } = data.kommandr;
      if (id) {
        ReactAlert.success('You have successfully starred a Kommandr');
      }      
    });
  }


  reportKommandr(reason) {
    const { id } = this.props.kommandr;
    this.props.reportKommandr({
      variables: { id, reason },
    }).then(({ data }) => {
      if (id) {
        this.toggleModalReport();
        ReactAlert.success('Thank you, we will review your report');
      }
    });
  }

  saveComment() {
    const kommandrId = this.props.kommandr.id;
    const { comment } = this.state;
    this.props.addComment({
      variables: {
        kommandrId,
        comment
      },
      refetchQueries: [
        { 
          query: kommandrById,
          variables: {
            id: kommandrId,
          }
        }
      ]
    }).then(({ data }) => {
      if (data) {
        ReactAlert.success('Your comment has been posted');        
      }
      this.setState({
        comment: '',
      });
    });
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
  
  setComment(e) {
    const comment = e.target.value;
    this.setState({
      comment
    });
  }

  toggleModalDelete() {
    this.setState({
      isOpenModalDelete: !this.state.isOpenModalDelete,
    });
  }
  
  toggleModalFork() {
    this.setState({
      isOpenModalFork: !this.state.isOpenModalFork,
    });
  }

  toggleModalReport() {
    this.setState({
      isOpenModalReport: !this.state.isOpenModalReport,
    });
  }

  toggleModalShare() {
    this.setState({
      isOpenModalShare: !this.state.isOpenModalShare,
    });
  }

  render() {
    const { mode, kommandr, data: { loading, currentUser } } =  this.props;
    const {
      isOpenModalDelete,
      title,
      cli,
      description,
      isOpenModalShare,
      isOpenModalReport,
      isOpenModalFork,
      comment
    } = this.state;

    if (loading) return <p>Loading...</p>;
    var author, isOwnedByCurrentUser = false, isAnonymous = currentUser === null;
    
    if (mode === 'view') {
      isOwnedByCurrentUser = currentUser && kommandr.author.id === currentUser.id;
      if (!isOwnedByCurrentUser) {
      }
      author = kommandr.author;
    } else if (!isAnonymous) {
      author = currentUser;
    }
    return (
      <Fade className={classNames({ 'container-fluid d-flex flex-column mt-2': true} , {'view-mode': (mode === 'view') })}>
        <div className="kommandr-title mb-2">
          <input className="editable-input" type="text" value={title} onChange={this.setTitle} placeholder="Name this kommandr" />
        </div>
        <div className="kommandr-actions mb-3 d-flex justify-content-end">
          <Stats>
            <StatView value={(mode === 'view') ? kommandr.totalViews : 0} />
            <StatComment value={(mode === 'view') ? kommandr.totalComments : 0} disabled={isAnonymous} />
            <StatFork value={(mode === 'view') ? kommandr.totalForks : 0} onClick={this.toggleModalFork} disabled={(isAnonymous || mode === 'add' || isOwnedByCurrentUser)} />
            <StatStar value={(mode === 'view') ? kommandr.totalStars : 0} disabled={(mode === 'add' || isAnonymous)} onClick={this.starKommandr} />
          </Stats>
          <Actions className="ml-auto" >
            {mode === 'add' && <ActionButton text="create" name="add" onClick={this.saveKommandr} disabled={cli.length === 0 || title.length === 0} tooltip={true} />}
            {mode === 'view' && isOwnedByCurrentUser && <ActionButton text="update" name="update" onClick={this.saveKommandr} tooltip={true} />}
            {mode === 'view' && !isOwnedByCurrentUser && currentUser && <ActionButton text="report" name="report" onClick={this.toggleModalReport} tooltip={true} />}
            {mode === 'view' && isOwnedByCurrentUser && <ActionButton text="delete" name="delete" onClick={this.toggleModalDelete} tooltip={true} />}
            {mode === 'view' && <ActionButton text="share" name="share" onClick={this.toggleModalShare} tooltip={true} />}
          </Actions>
        </div>
        <div className="kommandr mb-2">
          <CodeMirror value={cli} onChange={this.setCli} options={codemirrorOpts} />
        </div>

        <CommandLineAuthor author={author} kommandr={kommandr} >
          <div className="kommandr-description">
            {mode === 'add' || isOwnedByCurrentUser
              ? <Input type="textarea" value={description} onChange={this.setDescription} maxLength="1000" placeholder="Explain what this command does"/>
              : <div className="static-description">{description}</div>
            }
          </div>
        </CommandLineAuthor>
        {mode === 'view' &&
          <CommandLineComments total={kommandr.allComments.length}>
            <AuthenticatedOnly currentUser={currentUser} alertMessage="Login to post a comment">
              <AddComment 
                hideAnonymous 
                author={currentUser} 
                value={comment} 
                handleOnChange={this.setComment} 
                handleOnSubmit={this.saveComment} />
            </AuthenticatedOnly>
            <CommentList data={kommandr.allComments} />
          </CommandLineComments>
        }
    
        <ModalForkKommandr isOpen={isOpenModalFork} onClickConfirm={this.forkKommandr} toggle={this.toggleModalFork} />
        <ModalShareKommandr isOpen={isOpenModalShare} toggle={this.toggleModalShare} kommandr={kommandr} />
        <ModalReportKommandr isOpen={isOpenModalReport} onClickConfirm={this.reportKommandr} toggle={this.toggleModalReport} />
        <ModalDeleteKommandr isOpen={isOpenModalDelete} onClickConfirm={this.deleteKommandr} toggle={this.toggleModalDelete} />
      </Fade>
    );
  }
}

CommandLine.propTypes = {
  mode: PropTypes.string,
  kommandr: PropTypes.object,
  data: PropTypes.object,
};

CommandLine.defaultProps = {
  mode: 'add',
};
export default compose(  
  graphql(currentUser),
  graphql(addKommandr, { name: 'addKommandr' }),
  graphql(updateKommandr, { name: 'updateKommandr' }),
  graphql(reportKommandr, { name: 'reportKommandr' }),
  graphql(deleteKommandr, { name: 'deleteKommandr' }),  
  graphql(forkKommandr, { name: 'forkKommandr' }),
  graphql(starKommandr, { name: 'starKommandr' }),
  graphql(addComment, { name: 'addComment' }),
)(withRouter(CommandLine));
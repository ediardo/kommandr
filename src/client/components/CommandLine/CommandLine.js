import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { Alert, Col, Media, Row } from 'reactstrap';
import CodeMirror from 'react-codemirror';
import classNames from 'classnames';
import hdate from 'human-date';
import ReactAlert from 'react-s-alert';

import { Actions, ActionButton } from './../Actions';

import { Stats, StatFork, StatView, StatComment, StatStar } from '../Stats/';
import { ModalDeleteKommandr, ModalShareKommandr, ModalReportKommandr, ModalForkKommandr } from '../Modal';
import CustomTooltip from '../CustomTooltip';
import addKommandr from '../../graphql/mutations/addKommandr.gql';
import forkKommandr from '../../graphql/mutations/forkKommandr.gql';
import deleteKommandr from '../../graphql/mutations/deleteKommandr.gql';
import updateKommandr from '../../graphql/mutations/updateKommandr.gql';
import reportKommandr from '../../graphql/mutations/reportKommandr.gql';
import starKommandr from '../../graphql/mutations/starKommandr.gql';
import unstarKommandr from '../../graphql/mutations/unstarKommandr.gql';
import allKommandrs from '../../graphql/queries/allKommandrs.gql';
import currentUser from '../../graphql/queries/currentUser.gql';
import searchKommandr from '../../graphql/queries/searchKommandr.gql';

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
};

const CommandLineTimestamps = ({ date }) => {
  return (
    <div className="kommandr-timestamps">
      Last updated <span id="lastUpdated">{hdate.relativeTime(date)}</span>
      <CustomTooltip content={hdate.prettyPrint(date, { showTime: true })} target="lastUpdated" placement="bottom" />
    </div>
  )
};

CommandLineTimestamps.propTypes = {
  date: PropTypes.string,
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
    this.unstarKommandr = this.unstarKommandr.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.toggleModalShare = this.toggleModalShare.bind(this);
    this.toggleModalReport = this.toggleModalReport.bind(this);
    this.toggleModalFork = this.toggleModalFork.bind(this);
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
      console.log(error);
      ReactAlert.error('There was an error while we try to Fork this Kommandr');
    });
  }

  deleteKommandr() {
    const { id } = this.props.kommandr.kommandr;
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
    console.log('Star');
  }

  unstarKommandr() {

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
    const { isOpenModalDelete, title, cli, description, isOpenModalShare, isOpenModalReport, isOpenModalFork } = this.state;
    if (loading) return <p>Loading...</p>;
    var isOwnedByCurrentUser = false, isAnonymous = (currentUser) ? false : true;;
    isOwnedByCurrentUser = mode === 'view' && currentUser && kommandr.author.id === currentUser.id;

    return (
      <div className={classNames({ 'view-mode': (mode === 'view') })}>
        <div className="kommandr-title mb-2">
          <input className="editable-input" type="text" value={title} onChange={this.setTitle} placeholder="Name this kommandr" />
        </div>
        <div className="mb-3 d-flex justify-content-end">
          <Stats>
            <StatView value={(mode === 'view') ? kommandr.totalViews : 0} />
            <StatComment value={(mode === 'view') ? kommandr.totalComments : 0} disabled={isAnonymous} />
            <StatFork value={(mode === 'view') ? kommandr.totalForks : 0} onClick={this.toggleModalFork} disabled={(isAnonymous || mode === 'add' || isOwnedByCurrentUser)} />
            <StatStar value={(mode === 'view') ? kommandr.totalStars : 0} onClick={this.starKommandr} disabled={(mode === 'add' || isOwnedByCurrentUser)} />
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
        {mode === 'view' && <CommandLineTimestamps date={kommandr.updatedAt} />}
        <Row className="kommandr-info">
          
        <textarea className="editable-input" defaultValue={description} onChange={this.setDescription} placeholder="Enter a description..." />                
         
        </Row>
        <ModalForkKommandr isOpen={isOpenModalFork} onClickConfirm={this.forkKommandr} toggle={this.toggleModalFork} />
        <ModalShareKommandr isOpen={isOpenModalShare} toggle={this.toggleModalShare} kommandr={kommandr} />
        <ModalReportKommandr isOpen={isOpenModalReport} onClickConfirm={this.reportKommandr} toggle={this.toggleModalReport} />
        <ModalDeleteKommandr isOpen={isOpenModalDelete} onClickConfirm={this.deleteKommandr} toggle={this.toggleModalDelete} />
      </div>
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
)(withRouter(CommandLine));
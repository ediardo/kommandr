import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Col, Row } from 'reactstrap';
import copy from 'copy-to-clipboard';
import CodeMirror from 'react-codemirror';

import Comments from '../containers/CommentsContainer';
import Info from '../containers/CommandLineInfoContainer';

import CommandLineActions from './CommandLineActions';
import Description from './CommandLineDescription';
import Title from './CommandLineTitle';
import Stats from './CommandLineStats';

import commandLineActions from '../redux/actions/commandLineActions';

import 'codemirror/addon/mode/simple';
import 'codemirror/mode/kommandr/kommandr';


class CommandLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cli: '',
      autoSave: false,
      autoSaveInterval: 10000
    };
    this.copyCli = this.copyCli.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.updateCli = this.updateCli.bind(this);
    this.autoSave = this.autoSave.bind(this);
    this.saveCli = this.saveCli.bind(this);
  }

  autoSave() {

  }

  copyCli() {
    const str = this.cliToString();
    copy(str);
  }

  saveCli() {

  }

  setTitle(title) {
    const { commandLineActions } = this.props.actions;
    commandLineActions.setTitle({title});
  }

  setDescription(description) {
    const { commandLineActions } = this.props.actions;
    commandLineActions.setDescription({description});
  }

  setCli() {
    const { cli } = this.state;
    const { commandLineActions } = this.props.actions;
    commandLineActions.setCli({cli})
  }

  updateCli(content) {
    this.setState({
      cli: content
    });
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }

  render() {
    const { title, description } = this.props.commandLine;
    return (
      <div className="kommandr-container">
        <Row className="mb-1">
          <Col xs="12" sm="8">
            <Title content={title} onChange={this.setTitle} />
          </Col>
          <Col xs="12" sm="4">
            <CommandLineActions handleClickCopy={this.copyCli} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs="12">
            <Stats stats={{views: 12, forks: 1, favs: 3, comments: 42}} />
          </Col>
        </Row>
        <div className="kommandr">
          <CodeMirror value={this.state.cli} onChange={this.updateCli} autoFocus={true} options={{lineNumbers: true, mode: "kommandrMode"}} />
        </div>
        <Info>
          <Row>
            <Col xs="12" sm="8">
              <Description content={description} author={{username: "ediardo"}} onChange={this.setDescription} />
            </Col>
            <Col xs="12" sm="4">
            </Col>
          </Row>

        </Info>
        <Row>
          <Comments comments={[]} />
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  commandLine: state.commandLine
});

const mapDispatchToProps = dispatch => ({
    actions: {
      commandLineActions: bindActionCreators(commandLineActions, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);

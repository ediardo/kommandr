import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Col, Container, Row } from 'reactstrap';
import copy from 'copy-to-clipboard';
import CodeMirror from 'react-codemirror';

import Comments from '../containers/CommentsContainer';
import Info from '../containers/CommandLineInfoContainer';

import Authoring from './CommandLineAuthor';
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
      prompt: '$',
      cli: ''
    };
    this.copyCli = this.copyCli.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.updateCli = this.updateCli.bind(this);
  }

  copyCli() {
    const str = this.cliToString();
    copy(str);
  }


  setTitle(title) {
    const { commandLineActions } = this.props.actions;
    commandLineActions.setTitle({title});
  }

  setDescription(description) {
    const { commandLineActions } = this.props.actions;
    commandLineActions.setTitle({description});
  }

  updateCli(content) {
    this.setState({
      cli: content
    });
  }

  render() {
    const { title, content, description, author, stats, comments } = this.props.commandLine;
    return (
      <div className="kommandr-container">
        <div className="kommandr">
          <CodeMirror value={this.state.cli} onChange={this.updateCli} autoFocus={true} options={{mode: "kommandrMode"}} />
        </div>
        <Info>
          <Title content={title} onChange={this.setTitle} />
          <Row>
            <Col>
              <Stats stats={{views: 12, forks: 1, favs: 3, comments: 42}} />
            </Col>
            <Col>
              <CommandLineActions handleClickCopy={this.copyCli} />
            </Col>
          </Row>
          <Description content={description} author={{username: "ediardo"}} onChange={this.setDescription} />
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

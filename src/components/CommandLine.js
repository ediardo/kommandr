import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Col, Container, Row } from 'reactstrap';
import copy from 'copy-to-clipboard';

import Content from '../containers/Content';
import Comments from '../containers/CommentsContainer';
import Info from '../containers/CommandLineInfoContainer';
import Sidebar from '../containers/Sidebar';
import SidebarMenu from '../components/SidebarMenu';

import CommandLineActions from './CommandLineActions';
import CustomCodeMirror from './CustomCodeMirror';
import Description from './CommandLineDescription';
import Title from './CommandLineTitle';
import Stats from './CommandLineStats';

import commandLineActions from '../redux/actions/commandLineActions';

class CommandLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoSaveTimeout: undefined,
      autoSaveDelay: 1000
    }
    this.copyCli = this.copyCli.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCli = this.setCli.bind(this);
    this.autoSave = this.autoSave.bind(this);
  }

  setCli(cli) {
    const { commandLineActions } = this.props.actions;
    this.setState({
      autoSaveTimeout: undefined
    });
    commandLineActions.setCli({cli});
  }

  autoSave(cli) {
    const { autoSaveTimeout, autoSaveDelay } = this.state;
    if (autoSaveTimeout !== undefined) {
        clearTimeout(autoSaveTimeout);
    }
    let timeOutId = setTimeout(this.setCli, autoSaveDelay, cli);
    this.setState({
      autoSaveTimeout: timeOutId
    });
  }

  copyCli() {
    const { cli } = this.props.commandLine;
    copy(cli);
  }

  setTitle(title) {
    const { commandLineActions } = this.props.actions;
    commandLineActions.setTitle({title});
  }

  setDescription(description) {
    const { commandLineActions } = this.props.actions;
    commandLineActions.setDescription({description});
  }

  render() {
    const { title, description, cli } = this.props.commandLine;
    return (
      <span>
        <Content sidebarOffset>
          <Container fluid>
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
                <CustomCodeMirror value={cli} autoSave={this.autoSave} />
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
          </Container>
        </Content>
        <Sidebar>
          <SidebarMenu />
        </Sidebar>
      </span>
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

import React, { Component } from 'react';

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

class CommandLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoSaveTimeout: undefined,
      autoSaveDelay: 1000
    }
    this.saveKommandr = this.saveKommandr.bind(this);
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

  saveKommandr() {
    
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
    const { loading } = this.props.data;
    if (loading) return <h4>Loading...</h4>
    console.log(this.props.data);
    const {
      hashId,
      userId,
      title,
      description,
      cli,
      createdAt,
      updatedAt,
      totalViews,
      totalComments,
      totalForks,
      totalFavs
    } = this.props.data.kommandr;

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
                  <CommandLineActions handleOnClickSave={this.saveKommandr} />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs="12">
                  <Stats data={{ hashId, totalViews, totalComments, totalForks, totalFavs }} />
                </Col>
              </Row>
              <div className="kommandr">
                <CustomCodeMirror value={cli} />
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

export default CommandLine;
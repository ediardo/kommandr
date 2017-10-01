import React, { Component } from 'react';

import { compose, graphql } from 'react-apollo';
import { Col, Container, Row } from 'reactstrap';
import copy from 'copy-to-clipboard';

import Content from '../containers/Content';
import Comments from '../containers/CommentsContainer';
import Info from '../containers/CommandLineInfoContainer';
import Sidebar from '../containers/Sidebar';
import SidebarSearch from './Sidebar/SidebarSearch';

import CommandLineActions from './CommandLineActions';
import CustomCodeMirror from './CustomCodeMirror';
import Description from './CommandLineDescription';
import Title from './CommandLineTitle';
import Stats from './Kommandr/KommandrStats';

import addKommandr from '../queries/addKommandr';
import updateKommandr from '../queries/updateKommandr';
import kommandrById from '../queries/kommandrById';

class CommandLine extends Component {
  constructor(props) {
    super(props);
    const { mode } = this.props;
    this.state = {
      autoSaveTimeout: undefined,
      autoSaveDelay: 1000,
      title: (mode === 'create') ? '' : this.props.data.kommandr.title,
      cli: (mode === 'create') ? '' : this.props.data.kommandr.cli,
      description: (mode === 'create') ? '' : this.props.data.kommandr.description,
      editing: false,
      mode,
    }
    this.saveKommandr = this.saveKommandr.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCli = this.setCli.bind(this);
    //this.autoSave = this.autoSave.bind(this);
  }



  saveKommandr() {
    const { title, cli, description } = this.state;
    const { mode } = this.props;
    if (mode === 'create') {
      this.props.addKommandr({
        variables: { title, cli, description }
      }).then(({data}) =>{
        console.log(data);
        const { hashId } = data.kommandr;
        this.props.history.push(`/k/${hashId}`);      
      }).catch(error => {
        console.log('there was an error ', error);
      });
    } else {
      const { hashId } = this.props.data.kommandr;
      this.props.updateKommandr({
        variables: { id: hashId, title, cli, description },
        refetchQueries: [{
          query: kommandrById,
          variables: { id: hashId },
        }]
      });
    }
  }
  
  /*
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
  */

  setCli(cli) {
    console.log('Save CLI', this.state);
    this.setState({
      cli,
      editing: true
    });
  }
  setDescription(description) {
    this.setState({
      description,
      editing: true
    });
  }

  setTitle(title) {
    this.setState({
      title,
      editing: true
    });
  }

  render() {
    const { editing, mode } = this.state;
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
                  <Title content={(editing) ? this.state.title : title} onChange={this.setTitle} />
                </Col>
                <Col xs="12" sm="4">
                  <CommandLineActions handleOnClickSave={this.saveKommandr} mode={mode}  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs="12">
                  <Stats data={{ hashId, totalViews, totalComments, totalForks, totalFavs }} />
                </Col>
              </Row>
              <div className="kommandr">
                <CustomCodeMirror value={(editing) ? this.state.cli : cli} onChange={this.setCli} />
              </div>
              <Info>
                <Row>
                  <Col xs="12" sm="8">
                    <Description content={(editing) ? this.state.description : description} author={{username: "ediardo"}} onChange={this.setDescription} />
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
          <SidebarSearch />
        </Sidebar>
      </span>
    );
  }
}

export default compose(
  graphql(addKommandr, { name: 'addKommandr' }),
  graphql(updateKommandr, { name: 'updateKommandr' })
)(CommandLine);
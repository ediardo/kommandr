import React, { Component } from 'react';

import { compose, graphql } from 'react-apollo';
import { Col, Container, Row } from 'reactstrap';
//import copy from 'copy-to-clipboard';

import Content from '../containers/Content';
import Info from '../containers/CommandLineInfoContainer';
import Sidebar from '../containers/Sidebar';
import SidebarSearch from './Sidebar/SidebarSearch';

import Actions from './Kommandr/KommandrActions';
import CustomCodeMirror from './CustomCodeMirror';
import Description from './CommandLineDescription';
import Stats from './Kommandr/KommandrStats';
import Title from './CommandLineTitle';

import addKommandr from '../queries/addKommandr';
import updateKommandr from '../queries/updateKommandr';
import kommandrById from '../queries/kommandrById';
import currentUser from '../queries/currentUser';

class CommandLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cli: '',
      description: '',
      editing: false,
    }
    this.saveKommandr = this.saveKommandr.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setCli = this.setCli.bind(this);
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
    const { mode, data: { loading, currentUser } }=  this.props;
    if (loading) return <span>loading...</span>;
    const { editing } = this.state;
    const {
      hashId,
      userId,
      title,
      description,
      cli,
      createdAt,
      updatedAt,
      totalViews,
      totalForks,
      totalFavs,
      author
    } = this.props.data.kommandr || {};
    const stats = {
      views: (mode === 'create') ? 0 : totalViews,
      forks: (mode === 'create') ? 0 : totalForks,
      favs: (mode === 'create') ? 0 : totalFavs,
    };
    return (
      <span>
        <Content sidebarOffset>
          <Container fluid className="kommandr-container">
            <Title editing={editing} mode={mode} data={(mode === 'create' || editing) ? this.state.title : title} onChange={this.setTitle} />
            <Row>
              <Col xs="12" sm="8">
              <Stats mode={mode} kommandrId={hashId} data={stats} />
              </Col>
              <Col xs="12" sm="4">
                <Actions />
              </Col>
            </Row>
            <div className="kommandr">
              <CustomCodeMirror mode={mode} value={(mode === 'create' || editing) ? this.state.cli : cli} onChange={this.setCli} />
            </div>
              <Info>
                <Row>
                  <Col xs="12" sm="8">
                    <Description content={(mode === 'create' || editing) ? this.state.description : description} author={(mode === 'view') ? author : currentUser} onChange={this.setDescription} />
                  </Col>
                  <Col xs="12" sm="4">
                  </Col>
                </Row>
              </Info>
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
  graphql(currentUser, {
    props: ({ ownProps, data }) => ({
      mode: (ownProps.match.params.hasOwnProperty('hashId')) ? 'view' : 'create',
      data: data
    })   
  }),
  graphql(kommandrById, {
    options: (props) => ({ variables: { id: props.match.params.hashId } }),
    props: ({ ownProps, data }) => ({
      mode: (ownProps.match.params.hasOwnProperty('hashId')) ? 'view' : 'create',
      data: data
    }),
    skip: (ownProps) => !ownProps.match.params.hasOwnProperty('hashId')
  }),
  graphql(addKommandr, { name: 'addKommandr' }),
  graphql(updateKommandr, { name: 'updateKommandr' }),
  
)(CommandLine);
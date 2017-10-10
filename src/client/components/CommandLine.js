import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { compose, graphql } from 'react-apollo';
import { Col, Media, Row } from 'reactstrap';

import Actions from './Kommandr/KommandrActions';
import CodeMirror from 'react-codemirror';

import 'codemirror/addon/mode/simple';
import 'codemirror/mode/shell/shell';import Description from './CommandLineDescription';
import Stats from './Kommandr/KommandrStats';
import Title from './CommandLineTitle';

import addKommandr from '../queries/addKommandr';
import updateKommandr from '../queries/updateKommandr';
import kommandrById from '../queries/kommandrById';
import currentUser from '../queries/currentUser';

class CommandLine extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    const { mode, kommandr: { title, cli, description } } = this.props;
    this.state = {
      title: (mode === 'view') ? title : '',
      cli: (mode === 'view') ? cli : '',
      description: (mode === 'view') ? description : '',
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
        const { id } = data.kommandr;
        this.props.history.push(`/k/${id}`);      
      }).catch(error => {
        console.log('there was an error ', error);
      });
    } else {
      const { id } = this.props.data.kommandr;
      this.props.updateKommandr({
        variables: { id, title, cli, description },
        refetchQueries: [{
          query: kommandrById,
          variables: { id },
        }]
      });
    }
  }

  setCli(e) {
    this.setState({
      cli:  e.target.value,
      editing: true
    });
  }
  setDescription(e) {
    this.setState({
      description: e.target.value,
      editing: true
    });
  }

  setTitle(e) {
    this.setState({
      title: e.target.value,
      editing: true
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.kommandr, nextProps.kommandr);
    if (this.props.kommandr.id !== nextProps.kommandr.id) {
      console.log('distinto');
      this.setState({
        title: '',
        cli: '',
        description: '',
      })
    }
  }

  render() {
    const { mode, kommandr, data: { loading, currentUser } }=  this.props;
    if (loading) return <span>loading...</span>;
    if (mode === 'view') {
      console.log(this.props);
      const { id } = kommandr;
    }
    var { title, cli, description, author } = this.state;

    if (currentUser === null || author.username === 'anon') {
      var isAnonymous = true;
    }


    return (
      <span>
        <div className="kommandr-title">
          <input className="editable-input" type="text" defaultValue={title} onChange={this.setTitle} placeholder="Name this kommandr" />
        </div>
        <Row>
          <Col xs="12" sm="8">
          <Stats mode={mode} kommandrId="A" data={{}} />
          </Col>
          <Col xs="12" sm="4">
            <Actions />
          </Col>
        </Row>
        <div className="kommandr">
        
          <CodeMirror value={cli} onChange={this.setCli} options={{lineNumbers: true, mode: "kommandrMode"}} />
        </div>
        <Row className="kommandr-info">
          <Col xs="12" className="kommandr-description">  
            <Media>
              <Media left href="#">
                <div className="user-avatar sm-avatar placeholder">
                  { isAnonymous
                    ? ''
                    : <img src={author.externalAvatarUrl} />
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
                  <textarea className="editable-input" value={description} onChange={this.setDescription} placeholder="Enter a description..." />                
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
  graphql(currentUser),
  graphql(addKommandr, { name: 'addKommandr' }),
  graphql(updateKommandr, { name: 'updateKommandr' }),
)(CommandLine);
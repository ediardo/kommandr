import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import Content from './Content';

class Main extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Container fluid>
        <Content className="main">
          <h1>Welcome</h1>
        </Content>
      </Container>
    )
  }
}

export default Main;

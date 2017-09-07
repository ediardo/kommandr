import React  from 'react';

import { Container } from 'reactstrap';

import Content from './Content';

const Main = (props) => {
  return (
    <Container fluid>
      <Content className="main">
        <h1>Welcome</h1>
      </Content>
    </Container>
  )
}

export default Main;

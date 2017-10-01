import React from 'react';

import { Container } from 'reactstrap';

import Ad from '../components/Ad';

const Sidebar = (props) => {
  return (
    <Container className="sidebar float-right">
      {props.children}
      <Ad />
    </Container>
  )
}

export default Sidebar;

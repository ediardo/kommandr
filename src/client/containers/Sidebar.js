import React from 'react';

import { Container } from 'reactstrap';

const Sidebar = (props) => {
  return (
    <Container className="sidebar float-right">
      {props.children}
    </Container>
  )
}

export default Sidebar;

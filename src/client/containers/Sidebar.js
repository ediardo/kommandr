import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'reactstrap';

const Sidebar = ({ children }) => {
  return (
    <Container className="sidebar float-right">
      {children}
    </Container>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired
};

export default Sidebar;

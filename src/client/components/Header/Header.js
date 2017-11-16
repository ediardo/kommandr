import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand
} from 'reactstrap';

import ProfileLink from './ProfileLink';

const Header = ({ location }) => {
  return (
    <header>
      <Navbar  color="faded" light expand="md">
        <NavbarBrand tag="span">
          <Link to={{ pathname: '/', state: 'createNew' }}>kommandr.com</Link>
        </NavbarBrand>
        <Button color="success" size="sm"><FontAwesome name="terminal" />{' '}Create new</Button>
        <Collapse navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <ProfileLink />
            </NavItem>
            <NavItem>
              <Button color="link" tag={Link} to={{ pathname: '/help', state: { from: location.pathname } }}>
                <FontAwesome name="question-circle" />
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      
    </header>
  )
};

Header.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Header);

import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {

  render() {
    return (
      <header>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">kommandr</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Create</NavItem>
              <NavItem eventKey={2} href="#">Fork</NavItem>

            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Sign in</NavItem>
              <NavItem eventKey={2} href="#">Sign up</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;

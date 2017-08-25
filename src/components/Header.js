import React from 'react';
import { Button, Collapse, Nav, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';

class Header extends React.Component {

  render() {
    return (
      <header>
        <Navbar  toggleable>
          <NavbarBrand>kommandr</NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav navbar>
              <NavItem>
                <Button  color="primary">Create</Button>
              </NavItem>
              <NavItem>
                <NavLink href="#">Fork</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;

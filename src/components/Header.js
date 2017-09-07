import React from 'react';

import FontAwesome from 'react-fontawesome';

import { Link } from 'react-router-dom';

import {
  Button,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  Navbar,
  NavbarBrand
} from 'reactstrap';

import CustomTooltip from './CustomTooltip';
import ModalHelp from './ModalHelp';
import ModalSignIn from './ModalSignIn';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      settingsMenuIsOpen: false,
      isOpenModalHelp: false,
      isOpenModalSignIn: false
    };
    this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
    this.toggleModalHelp = this.toggleModalHelp.bind(this);
    this.toggleModalSignIn = this.toggleModalSignIn.bind(this);
  }

  toggleSettingsMenu() {
    this.setState({
      settingsMenuIsOpen: !this.state.settingsMenuIsOpen
    });
  }

  toggleModalHelp() {
    this.setState({
      isOpenModalHelp: !this.state.isOpenModalHelp
    });
  }

  toggleModalSignIn() {
    this.setState({
      isOpenModalSignIn: !this.state.isOpenModalSignIn
    });
  }

  render() {
    const { isOpenModalHelp, isOpenModalSignIn } = this.state;
    return (
      <header>
        <Navbar  toggleable>
          <NavbarBrand tag='span'>
            <Link to="/">kommandr</Link>
          </NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav navbar className="mr-auto">
              <Link to="/new">
              <Button color="success" id="createKommandr" className="mr-3">
                <FontAwesome name="terminal" /> Create new
              </Button>
            </Link>
              <CustomTooltip content="Create a new Kommandr" placement="bottom center" target="createKommandr" />
            </Nav>
            <Dropdown isOpen={this.state.settingsMenuIsOpen} toggle={this.toggleSettingsMenu}>
              <DropdownToggle  color="link" className="mr-2">
                <FontAwesome name="cog" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Themes</DropdownItem>
                <DropdownItem>Light</DropdownItem>
                <DropdownItem>Dark</DropdownItem>
                <DropdownItem>Hacker</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button  color="link" onClick={this.toggleModalSignIn} className="mr-2">
              <FontAwesome name="user" />
            </Button>



            <Button color="link" onClick={this.toggleModalHelp}>
                <FontAwesome name="question-circle" />
            </Button>
            <ModalSignIn toggle={this.toggleModalSignIn} isOpen={isOpenModalSignIn} />
            <ModalHelp toggle={this.toggleModalHelp} isOpen={isOpenModalHelp} />
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;

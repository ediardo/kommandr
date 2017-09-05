import React from 'react';

import FontAwesome from 'react-fontawesome';

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
import SignInModal from './SignInModal';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      settingsMenuIsOpen: false,
      helpMenuIsOpen: false,
      signInModalIsOpen: false
    };
    this.toggleSettingsMenu = this.toggleSettingsMenu.bind(this);
    this.toggleSignInModal = this.toggleSignInModal.bind(this);
  }

  toggleSettingsMenu() {
    this.setState({
      settingsMenuIsOpen: !this.state.settingsMenuIsOpen
    });
  }

  toggleHelpMenu() {
    this.setState({
      helpMenuIsOpen: !this.state.helpMenuIsOpen
    });
  }

  toggleSignInModal() {
    this.setState({
      signInModalIsOpen: !this.state.signInModalIsOpen
    });
  }

  render() {
    const { signInModalIsOpen } = this.state;
    return (
      <header>
        <Navbar  toggleable>
          <NavbarBrand>kommandr</NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav navbar className="mr-auto">
              <Button color="success" id="createKommandr" className="mr-3">
                <FontAwesome name="terminal" /> Create
              </Button>
              <CustomTooltip content="Create a new Kommandr" placement="bottom center" target="createKommandr" />

              <Button  color="secondary" id="forkKommandr" className="mr-3" >
                <FontAwesome name="code-fork" /> Fork
              </Button>
              <CustomTooltip content="Copy this Kommandr" placement="bottom center" target="forkKommandr" />
              <Button  color="secondary" id="forkHistory">
                <FontAwesome name="history" /> History
              </Button>
              <CustomTooltip content="View history of this Kommandr" placement="bottom center" target="forkHistory" />

            </Nav>



            <Dropdown isOpen={this.state.settingsMenuIsOpen} toggle={this.toggleSettingsMenu}>
              <DropdownToggle caret color="link">
                <FontAwesome name="cog" /> Settings
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Themes</DropdownItem>
                <DropdownItem>Light</DropdownItem>
                <DropdownItem>Dark</DropdownItem>
                <DropdownItem>Hacker</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button color="link" onClick={this.toggleSignInModal}>
              <FontAwesome name="user" /> Sign in
            </Button>
            <SignInModal toggle={this.toggleSignInModal} isOpen={signInModalIsOpen} />

            <Button color="link">
                <FontAwesome name="question-circle" />
            </Button>

          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;

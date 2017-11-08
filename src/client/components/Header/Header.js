import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand
} from 'reactstrap';

import ProfileLink from './ProfileLink';
import ModalHelp from '../Modal/ModalHelp';
import ModalSignIn from '../Modal/ModalSignIn';

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
        <Navbar  color="faded" light expand="md">
          <NavbarBrand tag="span">
            <Link to={{ pathname: '/', state: 'createNew' }}>kommandr</Link>
          </NavbarBrand>
          <Collapse navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <ProfileLink onClickLoginHandler={this.toggleModalSignIn} />
              </NavItem>
              <NavItem>
                <Button color="link" onClick={this.toggleModalHelp}>
                  <FontAwesome name="question-circle" />
                </Button>
              </NavItem>
              <ModalSignIn toggle={this.toggleModalSignIn} isOpen={isOpenModalSignIn} />
              <ModalHelp toggle={this.toggleModalHelp} isOpen={isOpenModalHelp} />
            </Nav>
          </Collapse>
        </Navbar>
        
      </header>
    );
  }
}

export default Header;

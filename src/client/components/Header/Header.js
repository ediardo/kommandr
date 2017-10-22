import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand
} from 'reactstrap';

import ProfileLink from './ProfileLink';
import CustomTooltip from '../CustomTooltip';
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
    const { currentUser } = this.props.data;

    return (
      <header>
        <Navbar  toggleable>
          <NavbarBrand tag='span'>
            <Link to={{ pathname: '/', state: 'createNew' }}>kommandr</Link>
          </NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav navbar className="mr-auto">

            </Nav>
            { currentUser 
              ? <ProfileLink data={currentUser} />
              : <Button  color="link" onClick={this.toggleModalSignIn} className="mr-2">
                  <FontAwesome name="user" />
                </Button>
            }

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

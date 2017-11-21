import React, { Component } from 'react';
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

import { ModalLogin, ModalHelp } from '../Modal';
import ProfileLink from './ProfileLink';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalLogin: false,
      isOpenModalHelp: false,
    };
    this.handleToggleModalLogin = this.handleToggleModalLogin.bind(this);
    this.handleToggleModalHelp = this.handleToggleModalHelp.bind(this);
  }

  handleToggleModalHelp() {
    this.setState({
      isOpenModalHelp: !this.state.isOpenModalHelp,
    });
  }

  handleToggleModalLogin() {
    this.setState({
      isOpenModalLogin: !this.state.isOpenModalLogin
    })
  }

  render() {
    const { isOpenModalHelp, isOpenModalLogin } = this.state;
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
                <ProfileLink handleOnClickLogin={this.handleToggleModalLogin} />
              </NavItem>
              <NavItem>
                <Button color="link" onClick={this.handleToggleModalHelp}>
                  <FontAwesome name="question-circle" />
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <ModalLogin isOpen={isOpenModalLogin} handleToggle={this.handleToggleModalLogin} />
        <ModalHelp isOpen={isOpenModalHelp} handleToggle={this.handleToggleModalHelp} />
      </header>
    )
  }
 
}

Header.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Header);

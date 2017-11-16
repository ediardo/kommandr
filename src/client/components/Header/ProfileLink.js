import React from 'react';
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { apiUrl } from '../../utils/';
import currentUser from '../../graphql/queries/currentUser.gql';

const ProfileLink = ({ location, data: { currentUser, loading }, onClickLoginHandler }) => {
  if (loading) return null;
  if (!currentUser) {
    return (
      <Button  color="link" tag={Link} to={{ pathname: "/login", state: { from: location.pathname } }} className="mr-2">
        <FontAwesome name="user" />
      </Button>
    )
  } else {
    const { externalAvatarUrl, username } = currentUser;
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret color="link" size="sm">
        <img src={`${externalAvatarUrl}&s=30`} alt="avatar" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>
            You're <span className="font-weight-bold">{username}</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to={`/u/${username}/kommandrs`}>
            My Kommandrs
          </DropdownItem>
          <DropdownItem tag={Link} to={`/u/${username}/collections`}>
            My Collections
          </DropdownItem>  
          <DropdownItem tag={Link} to={`/u/${username}/stars`}>
            My Stars
          </DropdownItem>  
          <DropdownItem divider />          
          <DropdownItem tag={Link} to={`/u/${username}/edit`}>
            Edit my profile
          </DropdownItem>  
          <DropdownItem divider />  
          <DropdownItem tag="a" href={apiUrl('/logout')} >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
};

ProfileLink.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
  onClickLoginHandler: PropTypes.func,
};

export default graphql(currentUser)(withRouter(ProfileLink));
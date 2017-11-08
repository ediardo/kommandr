import React from 'react';
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { apiUrl } from '../../utils/';
import currentUser from '../../graphql/queries/currentUser.gql';

const ProfileLink = ({ data: { currentUser, loading }, onClickLoginHandler }) => {
  if (loading) return null;
  if (!currentUser) {
    return (
      <Button  color="link" onClick={() => onClickLoginHandler()} className="mr-2">
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
          <DropdownItem tag={Link} to={`/u/${username}/k`}>
            My Kommandrs
          </DropdownItem>
          <DropdownItem tag={Link} to={`/u/${username}/c`}>
            My Collections
          </DropdownItem>  
          <DropdownItem tag={Link} to={`/u/${username}/f`}>
            My Favs
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
  data: PropTypes.object,
  onClickLoginHandler: PropTypes.func,
};

export default graphql(currentUser)(ProfileLink);
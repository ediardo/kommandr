import React from 'react';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { apiUrl } from '../../utils/';

const ProfileLink = props => {
  const { username, externalAvatarUrl } = props.data;
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret color="link" size="sm">
      <img src={`${externalAvatarUrl}&s=30`} alt="avatar" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>
          Signed in as <span className="font-weight-bold">{username}</span>
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
};

export default ProfileLink;

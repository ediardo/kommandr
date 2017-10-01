import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const ProfileLink = props => {
  const { id, username, name, externalAvatarUrl } = props.data;
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret color="link" size="sm">
      <img src={`${externalAvatarUrl}&s=30`} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem tag={Link} to={`/u/${username}/k`}>
          My Kommandrs
        </DropdownItem>
        <DropdownItem tag={Link} to={`/u/${username}/c`}>
          My Collections
        </DropdownItem>
        <DropdownItem tag={Link} to={`/u/${username}/f`}>
          My Favs
        </DropdownItem>
        <DropdownItem tag={Link} to={`/u/${username}/edit`}>
          Edit my profile
        </DropdownItem>
        <DropdownItem tag={Link} to={`/signout`}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
};

export default ProfileLink;

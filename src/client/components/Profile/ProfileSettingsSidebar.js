import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';

const ProfileSettingsSidebar = ({ user }) => {
  return (
    <Nav vertical>
      <h4>Settings</h4>
      <NavLink to={`/settings`}>My public profile</NavLink>
      <NavLink to={`/settings/account`}>My account</NavLink>
      <NavLink to={`/settings/client`}>Kommandr client</NavLink>
    </Nav>
  )
};

ProfileSettingsSidebar.propTypes = {
  user: PropTypes.object
};

export default ProfileSettingsSidebar;
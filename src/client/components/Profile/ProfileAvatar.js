import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const sizes = { xs: 32, s: 42, m: 64, l: 128, xl: 255 };

const ProfileAvatar = ({ user, size, nolink }) => {
  if (user && user.username !== 'anon') {
    if (nolink) {
      return <Avatar size={sizes[size]} name={user.name} src={user.externalAvatarUrl} className="profile-avatar"/>
    } else {
      return (
        <Link to={`/u/${user.username}`}>
          <Avatar size={sizes[size]} name={user.name} src={user.externalAvatarUrl} className="profile-avatar"/>
        </Link>
      )
    }
  } else {
    return <Avatar size={sizes[size]} src="/img/avatar_placeholder.png"  className="profile-avatar"/>
  }
  
};

ProfileAvatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  nolink: PropTypes.bool,
};

ProfileAvatar.defaultProps = {
  size: 's',
  user: undefined,
  nolink: false,
};

export default ProfileAvatar;
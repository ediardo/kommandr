import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

const sizes = { s: 42, m: 64, l: 128, xl: 255 };

const ProfileAvatar = ({ url, name, size = 's' }) => {
  if (url) {
    return <Avatar size={sizes[size]} name={name} src={url} />
  } else {
    return <Avatar size={sizes[size]} name={name} />
  } 
};

ProfileAvatar.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
};

export default ProfileAvatar;
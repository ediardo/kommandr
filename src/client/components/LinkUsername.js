import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkUsername = ({ user }) => {
  if (user === undefined || user.username === 'anon') {
    return <span className="link-username disabled">Anonymous</span>
  } else {
    return <Link to={`/u/${user.username}`} className="link-username">{user.username}</Link>
  }
};

LinkUsername.propTypes = {
  user: PropTypes.object,
};

export default LinkUsername;
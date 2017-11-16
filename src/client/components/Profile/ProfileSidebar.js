import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Button } from 'reactstrap';

import ProfileAvatar from './ProfileAvatar';
import currentUser from '../../graphql/queries/currentUser.gql';

const ProfileSidebar = ({ user, data: { loading, currentUser } }) => {
  const { name, username, email, externalAvatarUrl } = user;
  const sameUser = currentUser && user.id === currentUser.id;
  return (
    <div className="user-card">
      <div className="user-avatar lg-avatar">
        <ProfileAvatar size="xl" url={externalAvatarUrl} name={name} />
      </div>
      <div className="user-info mt-2">
          <h4 className="user-display-name">{name}</h4>
          <h5 className="user-username">{username}</h5>
          <p>{email}</p>
      </div>
      <hr />
      <div className="user-details">
        {sameUser && <Button tag={Link} to={`/u/${currentUser}/edit`} color="primary">Edit my info</Button>}
      </div>

    </div>
  )
}

ProfileSidebar.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
};

export default graphql(currentUser)(ProfileSidebar);

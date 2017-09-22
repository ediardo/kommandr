import React from 'react';

const ProfileSidebar = props => {
  const { name, username, email, createdAt } = props.data;
  return (
    <div className="user-card">
      <div className="user-avatar lg-avatar placeholder">

      </div>
      <div className="user-info mt-2">
          <h4 className="user-display-name">{name}</h4>
          <h5 className="user-username">{username}</h5>
          <p>{email}</p>
          <p>{createdAt}</p>
      </div>
      <hr />
      <div className="user-details">

      </div>

    </div>
  )
}

export default ProfileSidebar;

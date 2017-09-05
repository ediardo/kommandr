import React from 'react';

import { Media } from 'reactstrap';

import UserAvatar from './UserAvatar';

const Comment = (props) => {
  const { id, user_id, created_at, comment } = props;
  return (
    <Media>
      <Media left>
        <UserAvatar id={user_id} />
      </Media>
      <Media body>
        {comment }
        {created_at}
      </Media>
    </Media>
  )
}

export default Comment;

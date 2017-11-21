import React from 'react';
import PropTypes from 'prop-types';

import { ProfileAvatar } from '../Profile/';
import LinkUsername from '../LinkUsername';

const Comment = ({ data }) => {
  return (
    <div className="comment-container d-flex flex-row">
      <div className="comment-author-avatar">
        <ProfileAvatar user={data.author} />
      </div>
      <div className="comment-body ml-2">
        <LinkUsername user={data.author} />
        <div className="comment">
          {data.comment}
        </div>
      </div>
    </div>
  )
};

Comment.propTypes = {
  comment: PropTypes.object,
};

export default Comment;
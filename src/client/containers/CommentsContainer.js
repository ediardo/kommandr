import React from 'react';

import Comment  from '../components/Comment';

const CommentsContainer = (props) => {
  const { comments } = props;
  if (comments.length === 0) return null;
  return <Comment id="1" user_id="1" created_at="2012" comment="This is a comment" />
}

export default CommentsContainer;

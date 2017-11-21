import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

const CommentList = ({ data }) => {
  const commentList = data.map((comment, idx) => {
    return (
      <li key={idx}>
        <Comment data={comment} />
      </li>
    )
  });
  return (
    <ul className="list-comments">
      {commentList}
    </ul>
  )
};

CommentList.propTypes = {
  data: PropTypes.array,
};

export default CommentList;
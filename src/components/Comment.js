import React from 'react';

import { Media } from 'reactstrap';



const Comment = (props) => {
  const { created_at, comment } = props;
  return (
    <Media>
      <Media left>
      </Media>
      <Media body>
        {comment }
        {created_at}
      </Media>
    </Media>
  )
}

export default Comment;

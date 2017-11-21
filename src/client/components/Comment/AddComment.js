import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Fade } from 'reactstrap';

import { ProfileAvatar } from '../Profile';

const AddComment = ({ handleOnSubmit, author, value, handleOnChange }) => {
  return (
    <div className="d-flex comment-add-container">
      <div className="flex-column comment-author">
        <ProfileAvatar user={author} size="xs"/>
      </div>
      <div className="flex-column ml-2 comment-input-container">
        <Input 
          className="comment-input"
          type="textarea"
          value={value}
          placeholder="add a comment..."
          onChange={(e) => handleOnChange(e)}
        />
        <div className="comment-input-controls text-right mt-1">
          <Fade in={value.length > 0}>
            <Button color="primary" outline size="sm" onClick={() => handleOnSubmit()} disabled={value.length === 0}>
              submit
            </Button>
          </Fade>
        </div>
      </div>
    </div>
  )
};

AddComment.propTypes = {
  author: PropTypes.object,
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
  handleOnSubmit: PropTypes.func,
};

AddComment.defaultProps = {
  value: '',
}
export default AddComment;
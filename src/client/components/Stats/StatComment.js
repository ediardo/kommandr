import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

const Comment = ({ value, className, onClick, compact }) => {
  if (compact) {
    return (
      <span className="stat-comment compact">
        <FontAwesome name="comments" />{' '}
        <span className="metric">{value}</span>
      </span>
    )
  } else {
    return (
      <InputGroup size="sm" className="stat-view full" >
        <InputGroupButton>
          <Button color="link"><FontAwesome name="comments" />{' '}comment</Button>
        </InputGroupButton>
        <InputGroupAddon>{value}</InputGroupAddon>
      </InputGroup>
    )
  }
};

Comment.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
};

Comment.defaultProps = {
  value: 0,
  compact: false,
};

export default Comment;
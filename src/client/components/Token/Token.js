import React from 'react';
import PropTypes from 'prop-types';
import hdate from 'human-date';
import { Badge } from 'reactstrap';

const Token = ({ data: { id, name, tokenHint, createdAt, updatedAt, lastUsedAt } }) => {
  return (
    <div>
      <h5>{name}&nbsp;<Badge color="secondary">...{tokenHint}</Badge></h5>
      <p>Last time used { lastUsedAt ? hdate.relativeTime(lastUsedAt) : 'never'}</p>
      <span>Created {hdate.relativeTime(createdAt)}</span>

    </div>
  )
};

Token.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tokenHint: PropTypes.string,
    createdAt: PropTypes.string,
    lastUsedAt: PropTypes.string,
  })
};

export default Token;

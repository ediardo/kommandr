import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

const Fork = ({ value, className, onClick, compact, disabled }) => {
  if (compact) {
    return (
      <span className="stat-fork compact">
        <FontAwesome name="code-fork" />{' '}
        <span className="metric">{value || 0}</span>
      </span>
    )
  } else {
    return (
      <InputGroup size="sm" className="stat-fork full" >
        <InputGroupButton>
          <Button color="link" onClick={() => onClick()} disabled={disabled}>
            <FontAwesome name="code-fork" />{' '}fork
          </Button>
        </InputGroupButton>
        <InputGroupAddon>{value || 0}</InputGroupAddon>
      </InputGroup>
    )
  }
};

Fork.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  disabled: PropTypes.bool,
};

Fork.defaultProps = {
  value: 0,
  compact: false,
  disabled: undefined,
};

export default Fork;
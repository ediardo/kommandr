import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

const Star = ({ value, className, onClick, compact, disabled }) => {
  if (compact) {
    return (
      <span className="stat-star compact">
        <FontAwesome name="star" />{' '}
        <span className="metric">{value}</span>
      </span>
    )
  } else {
    return (
      <InputGroup size="sm" className="stat-star full" >
        <InputGroupButton>
          <Button color="link" onClick={() => onClick()} disabled={disabled}>
            <FontAwesome name="star" />{' '}star
          </Button>
        </InputGroupButton>
        <InputGroupAddon>{value}</InputGroupAddon>
      </InputGroup>
    )
  }
};

Star.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  disabled: PropTypes.bool,
};

Star.defaultProps = {
  value: 0,
  compact: false,
};

export default Star;
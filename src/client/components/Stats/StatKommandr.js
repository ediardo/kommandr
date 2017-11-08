import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

const Kommandr = ({ value, className, onClick, compact }) => {
  if (compact) {
    return (
      <span className="stat-kommandr compact">
        <FontAwesome name="terminal" />{' '}
        <span className="metric">{value || 0}</span>
      </span>
    )
  } else {
    return (
      <InputGroup size="sm" className="stat-kommandr full" >
        <InputGroupButton>
          <Button color="link"><FontAwesome name="terminal" />{' '}kommandrs</Button>
        </InputGroupButton>
        <InputGroupAddon>{value || 0}</InputGroupAddon>
      </InputGroup>
    )
  }
};

Kommandr.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
};

Kommandr.defaultProps = {
  value: 0,
  compact: false,
};

export default Kommandr;
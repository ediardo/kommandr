import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

const View = ({ value, className, onClick, compact }) => {
  if (compact) {
    return (
      <span className="stat-view compact">
        <FontAwesome name="eye" />{' '}
        <span className="metric">{value}</span>
      </span>
    )
  } else {
    return (
      <InputGroup size="sm" className="stat-view full" >
        <InputGroupButton>
          <Button color="link"><FontAwesome name="eye" />{' '}views</Button>
        </InputGroupButton>
        <InputGroupAddon>{value}</InputGroupAddon>
      </InputGroup>
    )
  }
};

View.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
};

View.defaultProps = {
  value: 0,
  compact: false,
};

export default View;
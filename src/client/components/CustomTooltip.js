import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const CustomTooltip = ({ content, placement, target }) => {
  return (
    <UncontrolledTooltip placement={placement} target={target}  autohide={false} delay={{show: 100, hide: 0}} >
      {content}
    </UncontrolledTooltip>
  )
}

CustomTooltip.propTypes = {
  content: PropTypes.string,
  placement: PropTypes.string,
  target: PropTypes.string,
};

CustomTooltip.defaultProps = {
  placement: 'top',
};

export default CustomTooltip;

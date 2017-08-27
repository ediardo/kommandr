import React from 'react';

import { UncontrolledTooltip } from 'reactstrap';

const CustomTooltip = props => {
  const { content, placement, target } = props;

  return (
    <UncontrolledTooltip placement={placement} target={target}  autohide={false} >
      {content}
    </UncontrolledTooltip>
  )
}

export default CustomTooltip;

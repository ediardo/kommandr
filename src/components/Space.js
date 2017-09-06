import React from 'react';

const Space = ({className=''}) => {
  return (
    <span className={`space ${className}`}>
      {''}&nbsp;
    </span>
  )
}

export default Space;

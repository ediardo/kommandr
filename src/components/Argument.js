import React from 'react';

const Argument = ({argument, className=''}) => {
  return (
    <span className={`argument ${className}`}>
      {argument}
    </span>
  )
};

export default Argument;

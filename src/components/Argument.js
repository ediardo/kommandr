import React from 'react';

const Argument = ({argument, className=''}) => {
  return (
    <span className={`argument ${className}`}>
      {argument.value}
    </span>
  )
};

export default Argument;

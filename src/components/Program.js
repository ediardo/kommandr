import React from 'react';

const Program = (props) => {
  const {program, className} = props;
  return (
    <span className={`program ${className}`}>
      {program.name}
    </span>
  )
};

export default Program;

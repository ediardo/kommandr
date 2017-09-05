import React from 'react';

const Program = (props) => {
  const { className, editable, onClick, content } = props;
  return <span className={`program ${className}`}>{content}</span>
};

export default Program;

import React from 'react';

const CommandLineInfoContainer = (props) => {
  const { className, children } = props;

  return (
    <div className={`kommandr-info ${className}`}>
      {children}
    </div>
  )
}

export default CommandLineInfoContainer;

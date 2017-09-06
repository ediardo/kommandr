import React from 'react';

const CommandLineInfoContainer = (props) => {
  const { className, children } = props;

  return (
    <div className={`kommandr-info mt-3 ${(className === undefined) ? '' : className}`}>
      {children}
    </div>
  )
}

export default CommandLineInfoContainer;

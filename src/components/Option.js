import React from 'react';

const Option = (props) => {
  const {option, className} = props;
  return (
    <span className={`option ${className}`}>
      {option.name}
    </span>
  )
};

export default Option;

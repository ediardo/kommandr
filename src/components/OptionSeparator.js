import React from 'react';

const OptionSeparator = (props) => {
  const {separator, className} = props;
  return (
    <span className={`separator ${className}`}>
      {separator}
    </span>
  )
};

export default OptionSeparator;

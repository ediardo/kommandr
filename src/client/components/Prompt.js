import React from 'react';

const Prompt = ({prompt, className=''}) => {
  return (
    <span className={`prompt ${className}`}>
      {prompt}
    </span>
  )
};

export default Prompt;

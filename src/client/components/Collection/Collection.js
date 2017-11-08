import React from 'react';
import PropTypes from 'prop-types';

const Collection = ({ data }) => {
  return (
    <div>{data.name}</div>
  )
};

Collection.propTypes = {
  data: PropTypes.object,
};

export default Collection;
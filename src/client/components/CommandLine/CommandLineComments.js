import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

const CommandLineComments = ({ total, children }) => {
  return (
    <div className="kommandr-comments mt-3">
        <h4>comments <Badge color="dark">{total}</Badge></h4>
        {children}
    </div>
  )
};

CommandLineComments.propTypes = {
  total: PropTypes.number,
};

export default CommandLineComments;
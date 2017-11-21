import React from 'react';
import PropTypes from 'prop-types';

const Actions = ({ children, className }) => {
  const actions = children.filter((stat, idx) => {
    if (stat) {
      return (
        <li className="action" key={idx}>
          {stat}
        </li>
      )
    }
    return null;
  });

  return (
    <ul className={`inline-actions ${className}`}>
      {actions}
    </ul>
  )
};

Actions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Actions.defaultProps = {
  className: '',
};

export default Actions;
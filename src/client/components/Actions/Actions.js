import React from 'react';

const Actions = (props) => {
  const actions = props.children.map((stat, idx) => {
    if (stat) {
      return (
        <li className="action" key={idx}>
          {stat}
        </li>
      )
    }
  });

  return (
    <ul className={`inline-actions ${props.className}`}>
      {actions}
    </ul>
  )
};

export default Actions;
import React from 'react';

const Stats = (props) => {
  const stats = props.children.map((stat, idx) => {
    return (
      <li className="stat" key={idx}>
        {stat}
      </li>
    )
  });

  return (
    <ul className="inline-stats">
      {stats}
    </ul>
  )
};

export default Stats;
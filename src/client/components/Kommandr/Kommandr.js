import React from 'react';
import { Link } from 'react-router-dom';

import Stats from './KommandrStats';

const Kommandr = props => {
  const {
    data: {
      id,
      title,
      description,
      cli,
      totalViews,
      totalFavs,
      totalForks,
    },
    compact
  } = props;
  return (
    <span>
      {!compact
        ? <h4><Link to={`/k/${id}`}>{title}</Link></h4>
        : <h6><Link to={`/k/${id}`}>{title}</Link></h6>
      }
      {!compact && <p>{description}</p>}
      <code>{cli}</code>
      <Stats mode="view" kommandrId={id} data={{views: totalViews, forks: totalForks, favs: totalFavs }} small />
    </span>
  )
}

export default Kommandr;

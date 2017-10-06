import React from 'react';
import { Link } from 'react-router-dom';

import Stats from './KommandrStats';

const Kommandr = props => {
  const {
    data: {
      hashId,
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
        ? <h4><Link to={`/k/${hashId}`}>{title}</Link></h4>
        : <h6><Link to={`/k/${hashId}`}>{title}</Link></h6>
      }
      {!compact && <p>{description}</p>}
      <code>{cli}</code>
      <Stats mode="view" kommandrId={hashId} data={{views: totalViews, forks: totalForks, favs: totalFavs }} small />
    </span>
  )
}

export default Kommandr;

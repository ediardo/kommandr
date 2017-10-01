import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CommandLineStats from './KommandrStats';

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
      totalComments,
      createdAt,
      updatedAt,
    },
    compact
  } = props;
  if (!compact) {
    return (
      <span>
        <h4><Link to={`/k/${hashId}`}>{title}</Link></h4>
        <p>{description}</p>
        <code>{cli}</code>
        <CommandLineStats data={{ hashId, totalViews, totalForks, totalComments, totalFavs }} small />
      </span>
    )
  } else {
    return (
      <span>
        <h6><Link to={`/k/${hashId}`}>{title}</Link></h6>
        <code>{cli}</code>
        <CommandLineStats data={{ hashId, totalViews, totalForks, totalComments, totalFavs }} small />
      </span>
    )
  }
}

export default Kommandr;

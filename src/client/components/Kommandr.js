import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CommandLineStats from './CommandLineStats';

const Kommandr = props => {
  const {
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
  } = props.data;
  return (
    <div className="kommandr-container">
      <h4>
        <Link to={`/k/${hashId}`}>{title}</Link>
      </h4>
      <p>{description}</p>
      <code>{cli}</code>
      <CommandLineStats data={{ hashId, totalViews, totalForks, totalComments, totalFavs }} small />
    </div>
  )
}

export default Kommandr;

import React from 'react';

import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';

const CommandLineStats = props => {
  const { hashId, totalComments, totalForks, totalViews, totalFavs } = props.data;
  return (
    <ul className="kommandr-stats">
      <li id={`statsViews_${hashId}`} className="mr-4">
        <FontAwesome name="eye"  className="mr-1"/>
        <span className="metric">{totalViews}</span>
      </li>
      <CustomTooltip content="Views" placement="top center" target={`statsViews_${hashId}`} />

      <li id={`statsFavs_${hashId}`} className="mr-4">
        <FontAwesome name="heart"  className="mr-1"/>
        <span className="metric">{totalFavs}</span>
      </li>
      <CustomTooltip content="Favorites" placement="top center" target={`statsFavs_${hashId}`} />

      <li id={`statsComments_${hashId}`} className="mr-4">
        <FontAwesome name="comments" className="mr-1"/>
        <span className="metric">{totalComments}</span>
      </li>
      <CustomTooltip content="Comments" placement="top center" target={`statsComments_${hashId}`} />

      <li id={`statsForks_${hashId}`}>
        <FontAwesome name="code-fork" className="mr-1"/>
        <span className="metric">{totalForks}</span>
      </li>
      <CustomTooltip content="Forks" placement="top center" target={`statsForks_${hashId}`} />

    </ul>
  )
}

export default CommandLineStats;

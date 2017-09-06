import React from 'react';

import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';

const CommandLineStats = (props) => {
  const { comments, forks, views, favs } = props.stats;
  return (
    <ul className="kommandr-stats">
      <li id="statsViews" className="mr-4">
        <FontAwesome name="eye"  className="mr-1"/>
        <span className="metric">{views}</span>
      </li>
      <CustomTooltip content="Views" placement="top center" target="statsViews" />
      <li id="statsFavs" className="mr-4">
        <FontAwesome name="heart"  className="mr-1"/>
        <span className="metric">{favs}</span>
      </li>
      <CustomTooltip content="Favorites" placement="top center" target="statsFavs" />
      <li id="statsComments" className="mr-4">
        <FontAwesome name="comments" className="mr-1"/>
        <span className="metric">{comments}</span>
      </li>
      <CustomTooltip content="Comments" placement="top center" target="statsComments" />
      <li id="statsForks">
        <FontAwesome name="code-fork" className="mr-1"/>
        <span className="metric">{forks}</span>
      </li>
      <CustomTooltip content="Forks" placement="top center" target="statsForks" />

    </ul>
  )
}

export default CommandLineStats;

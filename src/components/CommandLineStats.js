import React from 'react';

import FontAwesome from 'react-fontawesome';

import CustomTooltip from './CustomTooltip';

const CommandLineStats = (props) => {
  const { comments, forks, views, favs } = props.stats;
  return (
    <ul className="kommandr-stats">
      <li id="statsViews">{views} <FontAwesome name="eye" /></li>
      <CustomTooltip content="Views" placement="top center" target="statsViews" />
      <li id="statsFavs">{favs} <FontAwesome name="heart" /></li>
      <CustomTooltip content="Favorites" placement="top center" target="statsFavs" />
      <li id="statsComments">{comments} <FontAwesome name="comments" /></li>
      <CustomTooltip content="Comments" placement="top center" target="statsComments" />
      <li id="statsForks">{forks} <FontAwesome name="code-fork" /></li>
      <CustomTooltip content="Forks" placement="top center" target="statsForks" />

    </ul>
  )
}

export default CommandLineStats;

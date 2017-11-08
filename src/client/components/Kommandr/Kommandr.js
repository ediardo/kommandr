import React from 'react';
import PropTypes from 'prop-types';
import { Link, ListGroupItem, ListGroupItemText } from 'react-router-dom';

import Stats from './KommandrStats';

const Kommandr = ({ data, compact }) => {
  const {
    id,
    title,
    description,
    cli,
    totalViews,
    totalFavs,
    totalForks,
  } = data;
  //<ListGroupItemHeading>{title}</ListGroupItemHeading>
  return (
    <ListGroupItem className="kommandr-item">
      {!compact
        ? <h4><Link to={`/k/${id}`}>{title}</Link></h4>
        : <h6><Link to={`/k/${id}`}>{title}</Link></h6>
      }
      <ListGroupItemText>
        {cli}
      </ListGroupItemText>
      <Stats mode="view" kommandrId={id} data={{views: totalViews, forks: totalForks, favs: totalFavs }} small />      
    </ListGroupItem>

  )
}

Kommandr.propTypes = {
  data: PropTypes.object,
  compact: PropTypes.bool,
};

Kommandr.defaultProps = {
  compact: false,
};

export default Kommandr;

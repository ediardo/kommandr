import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import hdate from 'human-date';

import { Stats, StatKommandr } from '../Stats';

import CustomTooltip from '../CustomTooltip';

const CollectionList = ({ data, compact, isCurrentUser }) => {
  const collectionList = data.map((collection, idx) => {
    return (
      <ListGroupItem key={idx} className="collection-item">
        <ListGroupItemHeading>
          {isCurrentUser
            ? <Link to={`/u/${collection.author.username}/collections/view/${collection.name}`}>{collection.name}</Link>
            : collection.name
          }
          
          {collection.matchRegex && <Badge color="light" className="match-pattern" id={`badgeMatchPattern_${idx}`}>/{collection.matchRegex}/g</Badge>}
          {collection.matchRegex && <CustomTooltip target={`badgeMatchPattern_${idx}`} content="Matching this regex" />}
          
        </ListGroupItemHeading>
        <p>{collection.description}</p>
        <div className="inline-info">
          <Stats>
            <StatKommandr value={collection.totalKommandrs} compact/>
            {!collection.isEnabled && <span><Badge color="danger">disabled</Badge></span>}
            <span>Updated {hdate.relativeTime(collection.updatedAt)}</span>
          </Stats>
        </div>
      </ListGroupItem>
    )
  });
  return (
    <ListGroup className="list-collections">
      {collectionList}
    </ListGroup>
  )
}

CollectionList.propTypes = {
  compact: PropTypes.bool,
  data: PropTypes.array,
  isCurrentUser: PropTypes.bool,
};

export default CollectionList;

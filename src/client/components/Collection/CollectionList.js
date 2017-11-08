import React from 'react';
import PropTypes from 'prop-types';
import { Badge, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import hdate from 'human-date';

import { Stats, StatKommandr } from '../Stats';

import CustomTooltip from '../CustomTooltip';

const CollectionList = ({ data, compact }) => {
  const collectionList = data.map((collection, idx) => {
    return (
      <ListGroupItem key={idx} className="collection-item">
        <ListGroupItemHeading>
          {collection.name}
          {collection.matchPattern && <Badge color="light" className="match-pattern" id={`badgeMatchPattern_${idx}`}>/{collection.matchPattern}/g</Badge>}
          {collection.matchPattern && <CustomTooltip target={`badgeMatchPattern_${idx}`} content="Matching this regex" />}
            
        </ListGroupItemHeading>
        <p>{collection.description}</p>
        <div className="inline-info">
          <Stats>
            <StatKommandr value={collection.totalKommandrs} compact/>
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
};

export default CollectionList;

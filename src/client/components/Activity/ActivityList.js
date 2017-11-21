import React from 'react';

import _ from  'lodash';
import hdate from 'human-date';
import FontAwesome from 'react-fontawesome';

import { ListGroup, ListGroupItem } from 'reactstrap';

const Activity = data => {
  var icon, title, info;
  switch (data.data.targetType) {
    case 'fork':
      icon = <FontAwesome name="code-fork" />
      title = 'Forked a kommandr';
      info = hdate.relativeTime(data.data.createdAt);
      break;
    case 'kommandr':
      icon = <FontAwesome name="terminal" />
      title = 'Created a kommandr';
      info = hdate.relativeTime(data.data.createdAt);
      break;
    case 'comment':
      icon = <FontAwesome name="comment-o" />
      title = 'Posted a comment';
      info = hdate.relativeTime(data.data.createdAt);
      break;
    case 'collection':
      icon = <FontAwesome name="folder-o" />
      title = 'Created a collection';
      info = hdate.relativeTime(data.data.createdAt);
      break;
    case 'fav':
      icon = <FontAwesome name="heart" />
      title = 'Favorited a kommandr';
      info = hdate.relativeTime(data.data.createdAt);
      break;
    case 'team':
      icon = <FontAwesome name="users" />
      title = 'Created a team';
      info = hdate.relativeTime(data.data.createdAt);
      break;
    default: 
      return null;
  }
  return (
    <span>
      {icon}{' '}{title}{' '}{info}
    </span>
  )
};

const ActivityList = props => {
  const activity = props.data;
  const activities = activity.map((activity, idx) => {
    return (
      <ListGroupItem key={idx}>
        <Activity data={activity}/>
      </ListGroupItem>
    )
  });
  if (activities.length === 0) {
    return (
      <h3>No actitivies recorded yet</h3>
    )
  } else {
    return (
      <ListGroup>
        {activities}
      </ListGroup>
    )
  }
}

export default ActivityList;
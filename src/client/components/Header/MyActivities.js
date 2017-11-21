import React from 'react';

import ActivityList from './ActivityList';


const MyActivities = props => {
  const { data: activities } = props;
  
  return (
    <ActivityList data={activities} />
  )
}

export default MyActivities;

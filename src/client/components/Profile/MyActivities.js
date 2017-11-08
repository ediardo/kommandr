import React from 'react';
import PropTypes from 'prop-types';

import ActivityList from '../Activity/ActivityList';

const MyActivities = ({ currentUser, items: activities }) => {
  return (
    <ActivityList data={activities} />
  )
};

MyActivities.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.object,
};

export default MyActivities;
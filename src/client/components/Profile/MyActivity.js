import React from 'react';

import { graphql } from 'react-apollo';

import ActivityList from './ActivityList';
import getActivity from '../../queries/getActivity';

const MyActivity = props => {
  const { activity, loading } = props.data;
  
  if (loading) return <p>Loading...</p>;
  return (
    <ActivityList data={activity} />
  )
}

export default graphql(getActivity, {
  options: (props) => {
    return { variables: {
      username: props.user.username
    }}
  }
})(MyActivity);

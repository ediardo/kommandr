import React from 'react';

import { graphql } from 'react-apollo';

import KommandrList from '../Kommandr/KommandrList';

import kommandrsByUser from '../../queries/kommandrsByUser';

const MyKommandrs = (props) => {
  const { myKommandrs, loading } = props.data;
  if (loading) return <p>Loading...</p>;
  return (
    <KommandrList data={myKommandrs} />
  )
}
export default graphql(kommandrsByUser, {
  options: (props) => {
    return { variables: {
      username: props.user.username
    }}
  }
})(MyKommandrs);

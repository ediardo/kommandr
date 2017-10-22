import React from 'react';
import { graphql } from 'react-apollo';

import KommandrList from '../Kommandr/KommandrList';

import allKommandrsByUser from '../../queries/allKommandrsByUser';

const MyKommandrList = props => {
  const { loading, kommandrs } = props.data;
  if (loading) return <p>Loading...</p>;
  return (
    <KommandrList data={kommandrs} />
  )
};

export default graphql(allKommandrsByUser, {
  options: ({ username, query }) => { 
    return { variables: { username, query } }
  }
})(MyKommandrList);
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import CommandLine from './CommandLine';

import kommandrById from '../queries/kommandrById';

const CommandLineWithData = props => {
  const { loading } = props.data;
  console.log(props);
  if (loading) return <h3>Loading...</h3>
  return (
    <CommandLine mode="view" {...props} />
  )
}
export default graphql(kommandrById, {
  options: (props) => {
    return { variables: {
      id: props.match.params.hashId
    }}
  }
})(CommandLineWithData);
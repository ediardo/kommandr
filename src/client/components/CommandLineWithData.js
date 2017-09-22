import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import CommandLine from './CommandLine';

import kommandrById from '../queries/kommandrById';

const CommandLineWithData = props => {
  return (
    <CommandLine {...props} />
  )
}
export default graphql(kommandrById, {
  options: (props) => {
    console.log(props);
    return { variables: {
      id: props.match.params.hashId
    }}
  }
})(CommandLineWithData);

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import CommandLine from './CommandLine';

import kommandrById from '../queries/kommandrById';

const CommandLineWithNoData = props => {
  return (
    <CommandLine data={{kommandr:{}}} {...props} />
  )
}
export default CommandLineWithNoData;

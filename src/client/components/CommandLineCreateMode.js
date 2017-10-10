import React, { Component } from 'react';
import gql from 'graphql-tag';

import CommandLine from './CommandLine';

const CommandLineWithNoData = props => {
  if (props.loading) return <span>Loading...</span>;
  return (
    <CommandLine mode="create" />
  )
}
export default CommandLineWithNoData;

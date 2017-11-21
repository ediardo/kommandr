import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import CommandLine  from './CommandLine';
import kommandrById from '../../graphql/queries/kommandrById.gql';

const ViewCommandLine = (props) => {
  const { loading } = props.data;
  if (loading) return null;
  if (props.data.kommandr) {
    return <CommandLine mode="view" kommandr={props.data.kommandr} key={props.data.kommandr.id} />
  } else {
    return null;
  }
};

ViewCommandLine.propTypes = {
  mode: PropTypes.string,
  data: PropTypes.object,
};

ViewCommandLine.defaultProps = {
  mode: 'view',
};

export default graphql(kommandrById, {
  options: (props) => ({ variables: { id: props.match.params.kommandrId } })
})(ViewCommandLine);

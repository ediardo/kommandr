import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import ModalCollection from './ModalCollection';
import collectionByName from '../../graphql/queries/collectionByName.gql';

const ModalViewCollection = (props) => {
  const { loading } = props.data;
  if (loading) return null;
  if (props.data.collection) {
    return <ModalCollection mode="view" collection={props.data.collection} isOpen={true} {...props} />
  } else {
    return null;
  }
  
};

ModalViewCollection.propTypes = {
  mode: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default graphql(collectionByName, {
  options: (props) => ({ variables: { name: props.match.params.name } }),
  skip: (ownProps) => !ownProps.match.params.hasOwnProperty('name')    
})(ModalViewCollection);
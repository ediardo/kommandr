import React from 'react';
import { graphql } from 'react-apollo';

import userExists from '../../graphql/queries/userExists.gql';

const CheckUsername = ({ currentUsername, newUsername, data: { loading, userExists } }) => {
  if (loading) return <span className="text-secondary">verifying</span>
  if (userExists) {
    if (currentUsername === newUsername) {
      return <span className="text-secondary">this is you</span>
    } else {
      return <span className="text-danger">taken</span>
    }
  } else {
    return <span className="text-sucess">available</span>
  }
}

export default graphql(userExists, {
  options: (props) => {
    return { 
      variables: {
        username: props.newUsername
      },
      options: {
        fetchPolicy: 'network-only'
      }
    }
  }
})(CheckUsername);
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

const AuthenticatedOnly = ({ currentUser, alertMessage, children  }) => {
  if (currentUser) {
    return children;
  } else if (alertMessage) {
    return (
      <Alert color="secondary">
        <FontAwesome name="info-circle" />{' '}{alertMessage}
      </Alert>
    )
  }
  return null;
};

AuthenticatedOnly.propTypes = {
  currentUser: PropTypes.object,
  alertMessage: PropTypes.string,
};

export default AuthenticatedOnly;
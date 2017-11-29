import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import {
  ProfileSettingsPublic,
  ProfileSettingsAccount,
  ProfileSettingsClient,
  ProfileSettingsSidebar,
} from '../components/Profile/';
import currentUser from '../graphql/queries/currentUser.gql';

const ProfileSettings = ({ location, data: { loading, currentUser } }) => {
  if (loading) return <span>Loading...</span>;
  if (!currentUser) return <Redirect to={{ pathname: '/login', state: { from: location } }} />
  return (
    <main className="container">
      <Row className="profile row">
        <Col xs="12" sm="2">
          <ProfileSettingsSidebar user={currentUser} />
        </Col>
        <Col xs="12" sm="10" className="profile-settings-container">
          <Switch>
            <Route path="/settings" exact render={() => <ProfileSettingsPublic user={currentUser} location={location} />} />
            <Route path="/settings/account" render={() => <ProfileSettingsAccount user={currentUser} location={location} />} />
            <Route path="/settings/client" render={() => <ProfileSettingsClient user={currentUser} location={location} />}  />
          </Switch>
        </Col>
      </Row>
    </main>
  )
};

ProfileSettings.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
};

export default graphql(currentUser)(ProfileSettings);
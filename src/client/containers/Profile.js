  import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Col, Row } from 'reactstrap';

import { ProfileContent, ProfileSidebar } from '../components/Profile/';
import getUser from '../graphql/queries/getUser.gql';

const Profile = props => {
  const { data: { user, loading } } = props;
  //temp solution
  if (loading) {
    return null;
  } else {
    return (
      <main className="container">
        <Row className="profile row">
          <Col xs="12" sm="3">              
            <ProfileSidebar user={user} />
          </Col>
          <Col xs="12" sm="9">
             <ProfileContent user={user} />
          </Col>
        </Row>
      </main>
    )
  }
};

export default compose(
  graphql(getUser, {
    options: (props) => ({ variables: { username: props.match.params.username } })
  }),
)(Profile);

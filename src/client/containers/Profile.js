import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Container, Col } from 'reactstrap';

import Content from './Content';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';

import getUser from '../graphql/queries/getUser.gql';

const Profile = props => {
  const { data: { user, loading } } = props;
  //temp solution
  if (loading) {
    return null;
  } else {
    return (
      <Container>
        <Content className="profile row">
          <Col xs="12" sm="3">
            <ProfileSidebar user={user} />
          </Col>
          <Col xs="12" sm="9">
            <ProfileContent user={user} />
          </Col>
        </Content>
      </Container>
    )
  }
};

export default compose(
  graphql(getUser, {
    options: (props) => ({ variables: { username: props.match.params.username } })
  }),
)(Profile);

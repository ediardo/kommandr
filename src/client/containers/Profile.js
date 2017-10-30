import React, { Component }  from 'react';
import { graphql } from 'react-apollo';
import { Container, Col } from 'reactstrap';

import Content from './Content';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';

import getUser from '../graphql/queries/getUser.gql';

const Profile = ({ data: { user, loading} }) => {
  //temp solution
  if (loading) {
    return null;
  } else {
    return (
      <Container>
        <Content className="profile row">
          <Col xs="12" sm="3">
            <ProfileSidebar data={user} />
          </Col>
          <Col xs="12" sm="9">
            <ProfileContent data={user}/>
          </Col>
        </Content>
      </Container>
    )
  }
};

export default graphql(getUser, {
  options: (props) => {
    return { variables: {
      username: props.match.params.username
    }}
  }
})(Profile);

//export default Profile;

import React, { Component }  from 'react';
import { graphql } from 'react-apollo';
import {
  Container,
  Col
} from 'reactstrap';

import getProfile from '../queries/getProfile';

import Content from './Content';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';

class Profile extends Component {

  render() {
    const { profile, loading } = this.props.data;
    //temp solution
    if (loading) {
      return null;
    } else {
      return (
        <Container>
          <Content className="profile row">
            <Col xs="12" sm="3">
              <ProfileSidebar data={profile} />
            </Col>
            <Col xs="12" sm="9">
              <ProfileContent data={profile}/>
            </Col>
          </Content>
        </Container>
      )
    }
  }
}


export default graphql(getProfile, {
  options: (props) => {
    return { variables: {
      username: props.match.params.username
    }}
  }
})(Profile);

//export default Profile;

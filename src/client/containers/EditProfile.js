import React, { Component }  from 'react';
import { graphql } from 'react-apollo';
import {
  Container,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';

import getProfile from '../queries/getProfile';

class EditProfile extends Component {

  render() {
    const { profile, loading } = this.props.data;
    //temp solution
    if (loading) {
      return null;
    } else {
      return (
        <Container>
          <Row>
            <Col xs="3">
            <Nav vertical>
              <NavItem>
                <NavLink href="#">Profile</NavLink>
              </NavItem>
            </Nav>
            </Col>
            <Col xs="9">
              Content
            </Col>
          </Row>
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
})(EditProfile);

//export default Profile;

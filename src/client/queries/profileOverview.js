import gql from 'graphql-tag';

export default gql`
query userProfile($username: String!) {
  user(username: $username) {
    username
    email
  }
}
`;

import gql from 'graphql-tag';

export default gql`
query getProfile($username: String!) {
  user(username: $username) {
    username
    email
  }
}
`;

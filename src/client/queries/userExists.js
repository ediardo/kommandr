import gql from 'graphql-tag';

export default gql`
query userExists($username: String!) {
  userExists: user(username: $username) {
    id
    username
  }
}
`;

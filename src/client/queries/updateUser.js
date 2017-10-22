import gql from 'graphql-tag';

export default gql`
mutation updateUser($username: String, $password: String) {
  user: updateUser(username: $username, password: $password) {
    username
  }
}
`;

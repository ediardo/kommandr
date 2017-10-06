import gql from 'graphql-tag';

export default gql`
query getProfile($username: String!) {
  profile: user(username: $username) {
    id
    name
    username
    email
    externalAvatarUrl
    createdAt
  }
}
`;

import gql from 'graphql-tag';

export default gql`
query getActivity($username: String!) {
  activity: getActivity(username: $username) {
    id
    userId
    targetType
    targetId
    isPublic
    createdAt
  }
}
`;

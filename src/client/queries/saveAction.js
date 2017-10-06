import gql from 'graphql-tag';

export default gql`
mutation saveAction($targetId: String!, $targetType: String!) {
  myActions: saveAction(targetid: $targetId, targetType: $targetType) {
    id
    targetType
    targetId
    createdAt
  }
}
`;

import gql from 'graphql-tag';

export default gql`
query KommandrById($id: String!) {
  kommandr: kommandrById(id: $id) {
    id
    hashId
    userId
    title
    description
    cli
    createdAt
    updatedAt
    totalViews
    totalComments
    totalForks
    totalFavs
  }
}
`;

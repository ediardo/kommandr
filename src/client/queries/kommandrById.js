import gql from 'graphql-tag';

export default gql`
query KommandrById($id: String!) {
  kommandr: kommandrById(id: $id) {
    id
    userId
    title
    description
    cli
    createdAt
    updatedAt
    totalViews
    totalForks
    totalFavs
    author {
      username
    }
  }
}
`;

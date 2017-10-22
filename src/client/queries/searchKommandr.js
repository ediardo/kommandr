import gql from 'graphql-tag';

export default gql`
query searchKommandr($query: String!) {
  kommandrs: allKommandrs(title: $query, cli: $query) {
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
  collections: allCollections(name: $query) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

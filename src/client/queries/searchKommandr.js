import gql from 'graphql-tag';

export default gql`
query searchKommandr($query: String!) {
  kommandrs: allKommandrs(title: $query, cli: $query) {
    id
    hashId
    title
    cli
    totalViews
    totalFavs
    totalForks
    createdAt
    updatedAt
  }
  collections: allCollections(name: $query) {
    id
    name
    createdAt
    updatedAt
  }
}
`;

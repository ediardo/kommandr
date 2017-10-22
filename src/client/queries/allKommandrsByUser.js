import gql from 'graphql-tag';

export default gql`
query allKommandrsByUser($username: String, $query: String) {
  kommandrs: allKommandrs(username: $username, title: $query, cli: $query) {
    id
    title
    description
    cli
    totalViews
    totalFavs
    totalForks
  }
}
`;

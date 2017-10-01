import gql from 'graphql-tag';

export default gql`
query kommandrsByUser($username: String!) {
  myKommandrs: allKommandrsByUser(username: $username) {
    id
    hashId
    title
    description
    cli
    totalViews
    totalFavs
    totalForks
    totalComments
  }
}
`;

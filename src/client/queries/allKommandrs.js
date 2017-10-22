import gql from 'graphql-tag';

export default gql`
query allKommandrs {
  kommandrs: allKommandrs {
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
  }
}
`;

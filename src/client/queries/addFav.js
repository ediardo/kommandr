import gql from 'graphql-tag';

export default gql`
mutation addFav($userId: Int!, $kommandrId: Int!) {
  fav: addFav(userId: $userId, kommandrId: $kommandrId) {
    id
    userId
    kommandrId
    createdAt
  }
}`;

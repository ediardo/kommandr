import gql from 'graphql-tag';

export default gql`
mutation favKommandr($kommandrId: String!) {
  kommandr: favKommandr(kommandrId: $kommandrId) {
    id
    hashId
    totalFavs
  }
}`;

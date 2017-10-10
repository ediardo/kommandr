import gql from 'graphql-tag';

export default gql`
mutation forkKommandr($kommandrId: String!) {
  kommandr: forkKommandr(kommandrId: $kommandrId) {
    hashId
  }
}`;

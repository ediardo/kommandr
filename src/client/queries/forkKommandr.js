import gql from 'graphql-tag';

export default gql`
mutation forkKommandr($id: String!) {
  kommandr: forkKommandr(id: $id) {
    id
    hashId
  }
}`;

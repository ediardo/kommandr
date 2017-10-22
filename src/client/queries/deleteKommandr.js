import gql from 'graphql-tag';

export default gql`
mutation deleteKommandr($id: String!) {
  kommandr: deleteKommandr(id: $id) {
    id
    hashId
  }
}
`;

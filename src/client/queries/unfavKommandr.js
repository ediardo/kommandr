import gql from 'graphql-tag';

export default gql`
mutation unfavKommandr($kommandrId: String!) {
  fav: unfavKommandr(kommandrId: $kommandrId) {
    id
  }
}`;

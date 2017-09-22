import gql from 'graphql-tag';

export default gql`
mutation updateKommandr($hashId: String!, $title: String!, $cli: String!, $description: String) {
  kommandr: updateKommandr(hashId: $hashId, title: $title, cli: $cli, description: $description) {
    hashId
    title
    cli
    description
    createdAt
    updatedAt
  }
}
`;

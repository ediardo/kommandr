import gql from 'graphql-tag';

export default gql`
mutation updateKommandr($id: String!, $title: String!, $cli: String!, $description: String) {
  kommandr: updateKommandr(id: $id, title: $title, cli: $cli, description: $description) {
    hashId
    title
    cli
    description
    createdAt
    updatedAt
  }
}
`;

import gql from 'graphql-tag';

export default gql`
mutation addKommandr($title: String!, $cli: String!, $description: String) {
  kommandr: addKommandr(title: $title, cli: $cli, description: $description) {
    hashId
    title
    cli
    description
    createdAt
    updatedAt
  }
}
`;

import gql from 'graphql-tag';

export default gql`
  query LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      id
    }
  }
`

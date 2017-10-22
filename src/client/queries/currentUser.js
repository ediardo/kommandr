import gql from 'graphql-tag';

export default gql`
query currentUser {
  currentUser: loggedInUser {
    id
    name
    username
    externalAvatarUrl
    hasSeenWelcome
    status
  }
  myKommandrs: myKommandrs {
    id
  }
  myFavs: myFavs {
    id
  }
}
`;

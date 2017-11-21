const https =  false;
const clientPort = 5000;
const protocol = (https) ? 'https:' : 'http:';
const hostname = location.hostname
const apiPort = 5001;

export const apiUrl = (to) => {
  let uri = `${protocol}//${hostname}` + ((apiPort !== 80) ? `:${apiPort}` : '') + to;
  return uri;
}

export const siteUrl = (to) => {
  let uri = `${protocol}//${hostname}` + ((clientPort !== 80) ? `:${clientPort}` : '') + to;
  return uri;
};

export const sameUser = (user, currentUser) => {
  return user.id === currentUser.id;
};
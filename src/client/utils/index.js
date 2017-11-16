console.log(location);
const https = false;
const clientPort = 5000;
const protocol = (https) ? 'https' : 'http';
const domain = 'localhost';
const apiPort = 5001;

export const apiUrl = (to) => {
  let uri = `${protocol}//${domain}` + ((apiPort !== 80) ? `:${apiPort}` : '') + to;
  return uri;
}

export const siteUrl = (to) => {
  let uri = `${protocol}//${domain}` + ((clientPort !== 80) ? `:${clientPort}` : '') + to;
  return uri;
};
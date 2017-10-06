const portApi = 5001;

export const apiUrl = (to) => {
  let uri = '//api.kommandr.com';
  if (portApi) uri += `:${portApi}`;
  return uri + to;
}
import React from 'react';
import Link from 'react-router-dom';

const port = 5000;

const LinkApi = ({to, children}) => {
  var uri = '';
  uri = '//api.kommandr.com';
  if (port) uri += `:${port}`;
  uri += to;
  return (
  <Link to={uri} >
    {children}
  </Link>
  )
}
export default LinkApi;
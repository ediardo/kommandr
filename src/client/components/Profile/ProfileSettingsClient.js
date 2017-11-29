import React from 'react';

import MyTokens from './MyTokens';

const ProfileSettingsClient = ({ user, ...rest }) => {
  console.log(rest);
  return (
    <div>
      <h2>Kommandr Client</h2>
      <p>You can connect your terminal with Kommandr.com using the Kommandr CLI client program. 
      Just download the application from <a href="https://github.com/kommandr/kommandr-cli" target="_blank">here</a>&nbsp;
      and follow the installation instructions.</p>

      <p>You will need to generate a <span className="font-weight-bold">token</span> to link the client with your account</p>
      
      <MyTokens items={user.allTokens} {...rest}/>
    </div>
  )
};

export default ProfileSettingsClient;
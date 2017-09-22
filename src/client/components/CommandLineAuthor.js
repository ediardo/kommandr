import React from 'react';

import UserCard from './UserCard';

import 'holderjs/holder.js';

const CommandLineAuthor = (props) => {
  const { userId, username } = props.author;

  return (
    <div className="kommandr-author">
      <UserCard userId={userId} username={username} orientation="horizontal" />
    </div>

  )
}

export default CommandLineAuthor;

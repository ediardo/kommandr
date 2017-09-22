import React, { Component } from 'react';

import Kommandr from '../Kommandr';

const ListKommandrs = ({ kommandrs }) => {
  const listKommandrs = kommandrs.map(kommandr => {
    kommandr.stats = {comments: 10, views: 40, forks: 213, favs: 123};
    return <li key={kommandr.id}><Kommandr key={kommandr.id} data={kommandr} /></li>
    }
  );
  return (
    <ul className="list-kommandrs">
      {listKommandrs}
    </ul>
  )
}

export default ListKommandrs;

import React from 'react';

import Kommandr from '../Kommandr';

const ListFavs = ({ favs }) => {
  const listFavs = favs.map(fav =>
    <li key={fav.id}>
      <Kommandr key={fav.id} data={kommandr} />
    </li>
  );
  return (
    <ul className="my-list list-favs">
      {listKommandrs}
    </ul>
  )
}

export default ListKommandrs;

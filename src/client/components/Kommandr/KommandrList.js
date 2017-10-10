import React from 'react';

import classNames from 'classnames';
import Kommandr from './Kommandr';

const KommandrList = (props) => {
  const { compact, data } = props;
  const kommandrList = data.map((kommandr, idx) => {
    return (
      <li key={idx} className={classNames('kommandr-item', { compact: compact })}>
        <Kommandr data={kommandr} compact={compact} />
      </li>
    )
  });
  return (
    <ul className="list-kommandrs">
      {kommandrList}
    </ul>
  )
}

export default KommandrList;

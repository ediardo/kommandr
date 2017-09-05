import React from 'react';

import Ad from '../components/Ad';

const Sidebar = (props) => {
  return (
    <div className="sidebar float-right">
      {props.children}
      <Ad />
    </div>
  )
}

export default Sidebar;

import React from 'react';

const Content = (props) => {
  return (
    <div className={`content ${props.className} ${(props.sidebarOffset) ? 'sidebar-offset float-left' : ''} `} >
      {props.children}
    </div>
  )
}

export default Content;

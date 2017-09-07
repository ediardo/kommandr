import React, { Component } from 'react';

class SidebarMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar-menu">
        <ul>
          <li className="parent">My Collections</li>
        </ul>
      </div>
    )
  }
}

export default SidebarMenu;

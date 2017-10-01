import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap';
import classNames from 'classnames';

import ProfileOverview from './ProfileOverview';
import ListCollections from './ListCollections';
//import ListFavs from './ListFavs';
import MyKommandrs from './MyKommandrs';

class ProfileContent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      activeTab: 'profile'
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    this.setState({
      activeTab: tab
    });
  }

  render() {
    const { activeTab } = this.state;
    const user = this.props.data;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Link to={`/u/${user.username}`} className={'nav-link ' + classNames({ active: activeTab === 'profile' })} onClick={() => this.toggleTab('profile') }>
              Profile
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/k`} className={'nav-link ' + classNames({ active: activeTab === 'kommandrs' })} onClick={() => this.toggleTab('kommandrs') }>
              Kommandrs
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/c`} className={'nav-link ' + classNames({ active: activeTab === 'collections' })} onClick={() => this.toggleTab('collections') }>
              Collections
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/f`} className={'nav-link ' + classNames({ active: activeTab === 'favs' })}onClick={() => this.toggleTab('favs') }>
              Favs
            </Link>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="profile">
            <ProfileOverview user={user} />
          </TabPane>
          <TabPane tabId="kommandrs">
            <MyKommandrs user={user}/>
          </TabPane>
          <TabPane tabId="collections">
          </TabPane>
          <TabPane tabId="favs">
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default ProfileContent;

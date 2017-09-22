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
import ListComments from './ListComments';
//import ListFavs from './ListFavs';
import ListKommandrs from './ListKommandrs';

class ProfileContent extends Component {
  constructor(props) {
    super(props);
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
            <Link to={`/u/${user.username}/collections`} className={'nav-link ' + classNames({ active: activeTab === 'collections' })} onClick={() => this.toggleTab('collections') }>
              Collections
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/comments`} className={'nav-link ' + classNames({ active: activeTab === 'comments' })}onClick={() => this.toggleTab('comments') }>
              Comments
            </Link>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="profile">
            <ProfileOverview user={user} />
          </TabPane>
          <TabPane tabId="kommandrs">
            <ListKommandrs user={user}/>
          </TabPane>
          <TabPane tabId="collections">
          </TabPane>
          <TabPane tabId="comments">
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default ProfileContent;

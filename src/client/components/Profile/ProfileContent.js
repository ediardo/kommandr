import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap';
import classNames from 'classnames';

import MyActivities from './MyActivities';
import MyKommandrs from './MyKommandrs';
import MyCollections from './MyCollections';
import MyFavs from './MyFavs';

class ProfileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'profile'
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(activeTab) {
    this.setState({ activeTab });
  }

  render() {
    const { activeTab } = this.state;
    const { data: user } = this.props;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Link to={`/u/${user.username}`} className={'nav-link ' + classNames({ active: activeTab === 'profile' })} onClick={() => this.toggleTab('profile') }>
              Activity
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
          <TabPane tabId="profile" className="profile-overview">
            <MyActivities data={user.allActivities} />
          </TabPane>
          <TabPane tabId="kommandrs" className="my-kommandrs">
            <MyKommandrs data={user.allKommandrs} />
          </TabPane>
          <TabPane tabId="collections" className="my-collections">
            <MyCollections data={user.allCollections} />
          </TabPane>
          <TabPane tabId="favs" className="my-favs">
            <MyFavs data={user.allFavs} />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

ProfileContent.propTypes = {
  data: PropTypes.object,
};

export default ProfileContent;

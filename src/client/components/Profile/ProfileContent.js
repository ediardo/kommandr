import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  Badge,
  Nav,
  NavItem,
  TabContent,
  TabPane
} from 'reactstrap';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import MyActivities from './MyActivities';
import MyKommandrs from './MyKommandrs';
import MyCollections from './MyCollections';
import MyStars from './MyStars';
import MyComments from './MyComments';

import currentUser from '../../graphql/queries/currentUser.gql';

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
    const { user, data: { currentUser, loading } } = this.props;
    if (loading) return null;
    let isCurrentUser = currentUser && currentUser.id === user.id;
    let userActivities = (isCurrentUser) ? currentUser.allActivities : user.allActivities;
    let userKommandrs = (isCurrentUser) ? currentUser.allKommandrs : user.allKommandrs;
    let userCollections = (isCurrentUser) ? currentUser.allCollections : user.allCollections;
    let userStars = (isCurrentUser) ? currentUser.allStars : user.allStars;
    let userComments = (isCurrentUser) ? currentUser.allComments: user.allComments;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Link to={`/u/${user.username}`} className={'nav-link ' + classNames({ active: activeTab === 'profile' })} onClick={() => this.toggleTab('profile') }>
              Activity
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/kommandrs`} className={'nav-link ' + classNames({ active: activeTab === 'kommandrs' })} onClick={() => this.toggleTab('kommandrs') }>
              Kommandrs{' '}<Badge color="light">{userKommandrs.length || 0}</Badge>
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/collections`} className={'nav-link ' + classNames({ active: activeTab === 'collections' })} onClick={() => this.toggleTab('collections') }>
              Collections{' '}<Badge color="light">{userCollections.length || 0}</Badge>
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/u/${user.username}/stars`} className={'nav-link ' + classNames({ active: activeTab === 'stars' })} onClick={() => this.toggleTab('stars') }>
              Stars{' '}<Badge color="light">{userStars.length || 0}</Badge>
            </Link>
          </NavItem>
          {isCurrentUser && 
          <NavItem>
            <Link to={`/u/${user.username}/comments`} className={'nav-link ' + classNames({ active: activeTab === 'comments' })} onClick={() => this.toggleTab('comments') }>
              <FontAwesome name="lock" />{' '}Comments{' '}<Badge color="light">{userStars.length || 0}</Badge>
            </Link>
          </NavItem>
          }
        </Nav>
        <TabContent activeTab={activeTab} className="mt-3">
          <TabPane tabId="profile" className="my-activities">
            <MyActivities items={userActivities} isCurrentUser={isCurrentUser} />
          </TabPane>
          <TabPane tabId="kommandrs" className="my-kommandrs">
            <MyKommandrs items={userKommandrs} isCurrentUser={isCurrentUser} />
          </TabPane>
          <TabPane tabId="collections" className="my-collections">
            <MyCollections items={userCollections} isCurrentUser={isCurrentUser} />
          </TabPane>
          <TabPane tabId="stars" className="my-stars">
            <MyStars items={userStars} isCurrentUser={isCurrentUser} />
          </TabPane>
          <TabPane tabId="comments" className="my-comments">
            <MyComments items={userComments} isCurrentUser={isCurrentUser} />
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

ProfileContent.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
};

export default graphql(currentUser)(ProfileContent);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link, Switch, Route } from 'react-router-dom';
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
    console.log(props);
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
          <Switch>
            <Route path="/u/:username" exact render={(props) => <MyActivities items={userActivities} currentUser={currentUser} isCurrentUser={isCurrentUser} />} />
            <Route path="/u/:username/kommandrs" render={(props) => <MyKommandrs items={userKommandrs}  currentUser={currentUser} isCurrentUser={isCurrentUser} />} />
            <Route path="/u/:username/collections" render={(props) => <MyCollections items={userCollections} currentUser={currentUser} isCurrentUser={isCurrentUser} {...props} />} />
            <Route path="/u/:username/stars" render={(props) => <MyStars items={userStars} currentUser={currentUser} isCurrentUser={isCurrentUser} />} />
          </Switch>
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
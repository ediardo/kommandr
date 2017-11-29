import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Button } from 'reactstrap';
import ReactAlert from 'react-s-alert';

import { InputUsername, InputName, InputWebsite } from '../Form';
import { ProfileAvatar } from '../Profile';
import updateProfile from '../../graphql/mutations/updateUser.gql';
import currentUser from '../../graphql/queries/currentUser.gql';

class ProfileSettingsPublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      website: '',
    }
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeUsername = this.handleOnChangeUsername.bind(this);
    this.handleOnChangeWebsite = this.handleOnChangeWebsite.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile() {
    const { username, name, website } = this.state;
    this.props.updateProfile({
      variables: {
        username,
        name,
        website
      }
    }).then(({ data }) => {
      if (data) {
        ReactAlert.success('Your changes have been saved!');
      } else {
        ReactAlert.error('There was an error while we try perform this operation');
      }
    });
  }

  handleOnChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleOnChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleOnChangeWebsite(e) {
    this.setState({
      website: e.target.value      
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loading, currentUser } = nextProps.data;
    if (!loading && currentUser) {
      this.setState({        
        username: currentUser.username,
        naame: currentUser.name,
        website: currentUser.website || '',
      });
    }
  }

  render() {
    const { data: { loading, currentUser } } = this.props;
    if (loading) return <span>loading...</span>;
    const { username, name, website } = this.state;
    return (
      <div className="profile-settings-public">
        <div className="title">
          <h3>Public profile</h3>
        </div>
        <div className="mt-3 d-flex flex-row">
          <div className="profile-settings-form">
            <InputUsername value={username} onChange={this.handleOnChangeUsername} />
            <InputName value={name} onChange={this.handleOnChangeName} />
            <InputWebsite value={website} onChange={this.handleOnChangeWebsite} />
          </div>
          <div className="ml-3 profile-avatar-sidebar">
            <h5>Profile picture</h5>
            <div>
              <ProfileAvatar user={currentUser} size="xl" />
            </div>
            <div className="mt-3">
              <Button color="secondary" outline>Change picture</Button>
            </div>
          </div>
        </div>
        <Button color="primary" onClick={this.updateProfile} disabled={true}>Save changes</Button>
      </div>
    )
  }
    
}
export default compose(
  graphql(updateProfile, { name: 'updateProfile' }),
  graphql(currentUser)
)(ProfileSettingsPublic);
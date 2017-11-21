import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';

import ProfileAvatar from './ProfileAvatar';
import ContentEditable from './ContentEditable';

class CommandLineDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: (this.props.content === undefined) ? true : false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnUpdate = this.handleOnUpdate.bind(this);
  }

  handleOnClick() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  handleOnUpdate(newValue) {
    this.setState({
      isEditing: !this.state.isEditing
    });
    this.props.onChange(newValue);
  }

  render() {
    const { isEditing } = this.state;
    const { mode, data, author } = this.props;
    let isAnonymous;
    if (author === null || author.username === 'anon') {
      isAnonymous = true;
    }
    return (
      <div className="kommandr-description ">
        <Media>
          <Media left href="#">
            <div className="user-avatar sm-avatar placeholder">
            <ProfileAvatar size="s" url={author.externalAvatarUrl} name={author.name} />
            
            </div>
          </Media>
          <Media body className="ml-2">
            <span className="username">
              { isAnonymous
                ? 'anonymous user'
                : <Link to={`/u/${author.username}`}>{author.username}</Link> 
              }
            </span>
            <ContentEditable isEditing={isEditing} content={data} type="textarea" onUpdate={this.handleOnUpdate} placeholder="Add a useful description here...">
              <p onClick={this.handleOnClick}>{data}</p>
            </ContentEditable>
          </Media>
        </Media>
      </div>
    )
  }
}

export default CommandLineDescription;

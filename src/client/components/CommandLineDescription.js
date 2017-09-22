import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';


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
    const { content } = this.props, { username } = this.props.author;

    return (
      <div className="kommandr-description ">
        <Media>
          <Media left href="#">
            <div className="user-avatar sm-avatar placeholder"></div>
          </Media>
          <Media body className="ml-2">
            <span className="username">
              <Link to={`/u/${username}`}>{username}</Link>
            </span>
            <ContentEditable isEditing={isEditing} content={content} type="textarea" onUpdate={this.handleOnUpdate} placeholder="Add a useful description here...">
              <p onClick={this.handleOnClick}>{content}</p>
            </ContentEditable>
          </Media>
        </Media>
      </div>
    )
  }
}

export default CommandLineDescription;

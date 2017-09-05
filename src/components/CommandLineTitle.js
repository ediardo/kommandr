import React, { Component } from 'react';

import ContentEditable from './ContentEditable';

class CommandLineTitle extends Component {
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
    const { content } = this.props;

    return (
      <div className="kommandr-title">
        <ContentEditable isEditing={isEditing} content={content} onUpdate={this.handleOnUpdate} placeholder="Name this kommandr">
          <h2 onClick={this.handleOnClick}>{content}</h2>
        </ContentEditable>
      </div>
    )
  }
}

export default CommandLineTitle;

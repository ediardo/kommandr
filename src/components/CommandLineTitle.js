import React, { Component } from 'react';

const toggleClass = isVisible => (isVisible) ? 'd-inline-block' : 'hide';

class CommandLineTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputIsShown: false,
      title: this.props.title || "Name this Kommandr"
    }
    this.focusInput = this.focusInput.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  focusInput() {
    this.titleInput.focus();
  }

  keyUpHandler(e) {
    const { title } = this.state;
    if (e.key === 'Enter') {
      this.props.onChange(title);
      this.titleInput.blur();
    }
  }

  onChangeInput(e) {
    this.setState({
      title: e.target.value
    });
  }

  setTitle(e) {
    const { inputIsShown, title } = this.state;
    this.props.onChange(title);
    this.setState({
      inputIsShown: !inputIsShown
    });
  }

  render() {
    const { inputIsShown, title} = this.state;

    return (
      <div className="kommandr-title">
        <input className="title" type="text" ref={(input) => {this.titleInput = input;}} value={title} onChange={this.onChangeInput} onBlur={this.setTitle} onKeyUp={this.keyUpHandler} />
      </div>
    )
  }
}

export default CommandLineTitle;

import React, { Component } from 'react';

class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.props.isEditing,
      value: this.props.content || '',
      placeholder: ''
    }
    this.focusInput = this.focusInput.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  focusInput() {
    this.input.focus();
  }

  keyUpHandler(e) {
    if (e.key === 'Enter') {
      this.input.blur();
    }
  }

  onBlur(e) {
    const { value } = this.state;
    if (value !== '') {
      this.updateContent();
    }
  }

  onChangeInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  updateContent() {
    const { value } = this.state;
    this.props.onUpdate(value);
  }

  componentDidUpdate(nextProps, nextState) {
    if (!nextProps.isEditing) {
      this.input.focus();
    }
    return true;
  }

  render() {
    const { className, isEditing, placeholder, type } = this.props;
    const { value } = this.state;
    let editableInput;
    if (type === 'textarea') {
        editableInput = <textarea className="editable-input" ref={(input) => {this.input = input;}} value={value} onChange={this.onChangeInput} onBlur={this.onBlur} placeholder={placeholder} />
    } else {
      editableInput = <input className="editable-input" type="text" ref={(input) => {this.input = input;}} value={value} onChange={this.onChangeInput} onKeyUp={this.keyUpHandler} onBlur={this.onBlur} placeholder={placeholder} />
    }
    return (
      <div className={`content-editable ${className} ${(isEditing) ? 'editing' : ''}`}>
        <div className="editable">
          {this.props.children}
        </div>
        {editableInput}
      </div>
    )
  }
}

export default ContentEditable;

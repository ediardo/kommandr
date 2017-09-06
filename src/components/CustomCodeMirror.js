import React, { Component } from 'react';

import CodeMirror from 'react-codemirror';

import 'codemirror/addon/mode/simple';
import 'codemirror/mode/kommandr/kommandr';

class CustomCodeMirror extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cli: '',
      autoSaveTimeout: undefined,
      autoSaveDelay: 1000
    };
    this.updateCli = this.updateCli.bind(this);
  }

  updateCli(newCli) {
    this.setState({
      cli: newCli
    });
    this.props.autoSave(this.state.cli);
  }

  render() {
    return (
      <CodeMirror value={this.state.cli} onChange={this.updateCli} autoFocus={true} options={{lineNumbers: true, mode: "kommandrMode"}} />
    )
  }
}

export default CustomCodeMirror;

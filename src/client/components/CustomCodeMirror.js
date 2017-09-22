import React, { Component } from 'react';

import CodeMirror from 'react-codemirror';

import 'codemirror/addon/mode/simple';
import 'codemirror/mode/shell/shell';

class CustomCodeMirror extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cli: this.props.value,
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
    const { cli } = this.state;
    return (
      <CodeMirror value={cli} onChange={this.updateCli} autoFocus={true} options={{lineNumbers: true, mode: "kommandrMode"}} />
    )
  }
}

export default CustomCodeMirror;

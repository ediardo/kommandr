import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/addon/mode/simple';
import 'codemirror/mode/shell/shell';

class CustomCodeMirror extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cli: this.props.value,
    };
    this.updateCli = this.updateCli.bind(this);
  }

  updateCli(newCli) {
    this.setState({
      cli: newCli
    });
    this.props.onChange(this.state.cli);
  }

  render() {
    const { cli } = this.state;
    return (
      <div>
        <CodeMirror value={cli} onChange={this.updateCli} autoFocus={true} options={{lineNumbers: false, mode: "kommandrMode"}} />
      </div>
    )
  }
}

export default CustomCodeMirror;

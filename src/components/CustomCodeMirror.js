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
    this.save = this.save.bind(this);
  }

  save() {
  }

  updateCli(newCli) {
    this.setState({
      cli: newCli
    });
    this.props.autoSave(this.state.cli);
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    const { autoSaveTimeout, autoSaveDelay } = nextState;
    if (autoSaveTimeout !== undefined && this.state.autoSaveTimeout === undefined)
      return false;
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    const { autoSaveTimeout, autoSaveDelay } = prevState;
    if (autoSaveTimeout !== undefined && this.state.autoSaveTimeout !== undefined) {
      clearTimeout(autoSaveTimeout);
      console.log('si hay');
      this.setState({
        autoSaveTimeout: undefined
      });
    } else {
      console.log('no hay');
      this.setState({
        autoSaveTimeout: setTimeout(this.save, autoSaveDelay)
      });
    }
  }
  */
  render() {
    return (
      <CodeMirror value={this.state.cli} onChange={this.updateCli} autoFocus={true} options={{lineNumbers: true, mode: "kommandrMode"}} />
    )
  }
}

export default CustomCodeMirror;

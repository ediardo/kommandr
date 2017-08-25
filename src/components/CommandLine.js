import React from 'react';

import { Button } from 'reactstrap';
import copy from 'copy-to-clipboard';

import Prompt from './Prompt';

import ProgramCompleterContainer from '../containers/ProgramCompleter';
import OptionCompleterContainer from '../containers/OptionCompleter';
import SelectedPrograms from '../containers/SelectedPrograms';

class CommandLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      programCompleterIsOpen: false,
      isProgramSelected: false,
      optionCompleterIsOpen: false,
      selectedProgramId: undefined,
      selectedOptions: [],
      inputPlaceholder: 'Select a program',
      lastOptionId: undefined,
      isWaitingArg: false,
      prompt: '$'
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProgram = this.addProgram.bind(this);
    this.addOption = this.addOption.bind(this);
    this.setOptionValue = this.setOptionValue.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.copyCli = this.copyCli.bind(this);
    this.cliToString = this.cliToString.bind(this);
    this.resetCli = this.resetCli.bind(this);
    this.focusSearchInput = this.focusSearchInput.bind(this);
    this.hideCompleter = this.hideCompleter.bind(this);
  }

  addProgram(program) {
    const {commandLineActions} = this.props;
    commandLineActions.addProgram({id: program.id});
    this.setState({
      programCompleterIsOpen: false,
      isProgramSelected: true,
      query: '',
      inputPlaceholder: 'Add an option',
      selectedProgramId: program.id,
      optionCompleterIsOpen: true
    });

  }

  addOption(option) {
    const {commandLineActions} = this.props;
    commandLineActions.addOption({
      id: option.id,
      programId: option.programId,
      displayFormat: 'long'
    });
    this.setState({
      optionCompleterIsOpen: false,
      inputPlaceholder: 'Set a value',
      isWaitingArg: true,
      lastOptionId: option.id
    });
    this.focusSearchInput();
  }

  setOptionValue(option, value) {
    const {commandLineActions} = this.props, {id, programId} = option;
    commandLineActions.setOptionValue({id, programId, value });
  }

  handleClick(e) {
    const {optionCompleterIsOpen, programCompleterIsOpen, isWaitingArg, selectedProgramId} = this.state;
    e.stopPropagation();
    if (selectedProgramId === undefined && !programCompleterIsOpen) {
      this.setState({
        programCompleterIsOpen: true
      });
    } else if (!isWaitingArg && !optionCompleterIsOpen) {
      this.setState({
        optionCompleterIsOpen: true
      });
    } else {
      this.setState({
        optionCompleterIsOpen: false,
        programCompleterIsOpen: false
      });
    }
  }

  hideCompleter(e) {
    if (!e.path.includes('ul.completer-items')) {
      document.body.removeEventListener('click', this.hideCompleter);
      this.setState({
        programCompleterIsOpen: false,
        optionCompleterIsOpen: false
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleInputKeyDown(e) {
    const {isWaitingArg, query, selectedProgramId} = this.state;
    const {commandLineActions} = this.props;
    const {allOptions} = this.props.commandLine[selectedProgramId];
    if (e.key === 'Escape') {
      this.setState({
        optionCompleterIsOpen: false,
        programCompleterIsOpen: false,
        isWaitingArg: false
      });
    }
    if (e.key === 'Backspace') {
      if (query === '' && (isWaitingArg || allOptions.length > 0)) {
        commandLineActions.removeOption({
          id: allOptions[allOptions.length - 1],
          programId: selectedProgramId
        });
        this.setState({
          isWaitingArg: false,
          optionCompleterIsOpen: true
        })
      }
    }
    if (isWaitingArg) {
      if (e.key === 'Enter') {
        this.setOptionValue({
          id: this.state.lastOptionId,
          programId: selectedProgramId
        }, this.state.query);
        this.setState({
          query: '',
          inputPlaceholder: 'Add an option',
          isWaitingArg: false,
          optionCompleterIsOpen: true
        })
      }
    }
  }

  cliToString() {
    const {commandLine, programs, options} = this.props;
    let cli = [];
    commandLine.allPrograms.map(programId => {
      cli = [...cli, programs[programId].name];
      commandLine[programId].allOptions.map(optionId => {
        let opt = options[optionId].longOpt + commandLine[programId].options[optionId].separator + commandLine[programId].options[optionId].value;
        return cli = [...cli, opt];
      });
      return cli;
    });
    return cli.join(' ');
  }

  resetCli() {
    const {commandLineActions} = this.props;
    commandLineActions.resetCli();
    this.setState({
      inputPlaceholder: 'Select a program',
      optionCompleterIsOpen: false,
      programCompleterIsOpen: true,
      isWaitingArg: false,
      selectedProgramId: undefined
    })
  }

  focusSearchInput() {
    this.searchInput.focus();
  }

  copyCli() {
    const str = this.cliToString();
    copy(str);
  }

  componentDidMount() {
    this.focusSearchInput();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.optionCompleterIsOpen || nextState.programCompleterIsOpen) {
       document.body.addEventListener('click', this.hideCompleter);
    }
    return true;
  }

  render() {
    const {programCompleterIsOpen, optionCompleterIsOpen, prompt, isWaitingArg, selectedProgramId} = this.state;
    return (
      <div className="kommandr-container">
        <div className="kommandr">
          <Prompt prompt={prompt} className="float-left"/>
          <SelectedPrograms />
          <div className={`search-container ${(!isWaitingArg && selectedProgramId !==undefined) ? 'left-space' : ''}`}>
            <ProgramCompleterContainer items={this.props.programs} query={this.props.query} isOpen={programCompleterIsOpen} onClick={this.addProgram} />
            <OptionCompleterContainer query={this.props.query} isOpen={optionCompleterIsOpen} onClick={this.addOption} />
            <input ref={(input) => {this.searchInput = input;}} className="search-input" type="text" value={this.state.query} onKeyDown={this.handleInputKeyDown} placeholder={this.state.inputPlaceholder} onClick={this.handleClick} onChange={this.handleInputChange}></input>
          </div>
          <div className="clearfix" style={({height: 0})}></div>
        </div>
          <div className="actions-container">
            <Button outline color="info"  onClick={this.copyCli}>Copy to clipboard!</Button>{' '}
            <Button outline color="danger" onClick={this.resetCli}>Reset</Button>
          </div>
      </div>
    );
  }
}

export default CommandLine;

import React, { Component } from 'react';

import { Button, UncontrolledTooltip } from 'reactstrap';
import copy from 'copy-to-clipboard';
import FontAwesome  from 'react-fontawesome';


import CommandLineActions from './CommandLineActions';
import CommandLineReset from './CommandLineReset';
import Prompt from './Prompt';
import Title from './CommandLineTitle';

import ProgramCompleterContainer from '../containers/ProgramCompleter';
import OptionCompleterContainer from '../containers/OptionCompleter';
import SelectedPrograms from '../containers/SelectedPrograms';

class CommandLine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isProgramSelected: false,
      inputPlaceholder: 'Select a program',
      isWaitingArg: false,
      lastOptionId: undefined,
      optionCompleterIsOpen: false,
      programCompleterIsOpen: false,
      prompt: '$',
      query: '',
      selectedProgramId: undefined,
      selectedOptions: [],
    }

    this.addProgram = this.addProgram.bind(this);
    this.addOption = this.addOption.bind(this);
    this.cliToString = this.cliToString.bind(this);
    this.copyCli = this.copyCli.bind(this);
    this.focusSearchInput = this.focusSearchInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.hideCompleter = this.hideCompleter.bind(this);
    this.resetCli = this.resetCli.bind(this);
    this.setOptionValue = this.setOptionValue.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  addOption(option) {
    const {commandLineActions} = this.props;
    commandLineActions.addOption({
      id: option.id,
      programId: option.programId,
      displayFormat: 'long'
    });
    let inputPlaceholder, isWaitingArg;
    console.log(option);
    if (option.takesArg) {
      inputPlaceholder = 'Add an argument';
      isWaitingArg = true;
    } else {
      inputPlaceholder = 'Add an option';
      isWaitingArg = false;
    }
    this.setState({
      optionCompleterIsOpen: false,
      inputPlaceholder,
      isWaitingArg,
      lastOptionId: option.id
    });
    this.focusSearchInput();
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

  copyCli() {
    const str = this.cliToString();
    copy(str);
  }

  cliToString() {
    const {commandLine, programs, options} = this.props;
    let cli = [];
    commandLine.allPrograms.map(programId => {
      cli = [...cli, programs[programId].name];
      commandLine[programId].allOptions.map(optionId => {
        let opt = options[optionId].longOpt;
        if (options[optionId].takesArg) {
          opt += commandLine[programId].options[optionId].separator + commandLine[programId].options[optionId].value;
        }
        return cli = [...cli, opt];
      });
      return cli;
    });
    return cli.join(' ');
  }

  focusSearchInput() {
    this.searchInput.focus();
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

  handleInputChange(e) {
    this.setState({
      query: e.target.value
    });
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

  hideCompleter(e) {
    if (!e.path.includes('ul.completer-items')) {
      document.body.removeEventListener('click', this.hideCompleter);
      this.setState({
        programCompleterIsOpen: false,
        optionCompleterIsOpen: false
      });
    }
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

  setTitle(title) {
    const { commandLineActions } = this.props;
    commandLineActions.setTitle({title});
  }

  setOptionValue(option, value) {
    const {commandLineActions} = this.props, {id, programId} = option;
    commandLineActions.setOptionValue({id, programId, value });
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
        <Title content="Backup mysql database" onChange={this.setTitle} />
        <div className="kommandr d-flex align-items-stretch align-content-center">
          <Prompt prompt={prompt} />
          <SelectedPrograms>
            <div className={`search-container ${(!isWaitingArg && selectedProgramId !==undefined) ? 'left-space' : ''}`}>
              <ProgramCompleterContainer items={this.props.programs} query={this.props.query} isOpen={programCompleterIsOpen} onClick={this.addProgram} />
              <OptionCompleterContainer query={this.props.query} isOpen={optionCompleterIsOpen} onClick={this.addOption} />
              <input ref={(input) => {this.searchInput = input;}} className="search-input" type="text" value={this.state.query} onKeyDown={this.handleInputKeyDown} placeholder={this.state.inputPlaceholder} onClick={this.handleClick} onChange={this.handleInputChange}></input>
            </div>
          </SelectedPrograms>


          <CommandLineReset tooltip="Reset Kommandr" onClick={this.resetCli} />

          <div className="clearfix" style={({height: 0})}></div>
        </div>
        <CommandLineActions handleClickCopy={this.copyCli} />
      </div>
    );
  }
}

export default CommandLine;

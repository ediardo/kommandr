import React from 'react';
import {Button} from 'react-bootstrap';
import ProgramCompleterContainer from '../containers/ProgramCompleter';
import OptionCompleterContainer from '../containers/OptionCompleter';
import SelectedPrograms from '../containers/SelectedPrograms';
import copy from 'copy-to-clipboard';


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
      isWaitingForValue: false,
      lastProgramId: undefined
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProgram = this.addProgram.bind(this);
    this.addOption = this.addOption.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.copyCli = this.copyCli.bind(this);
    this.cliToString = this.cliToString.bind(this);
    this.resetCli = this.resetCli.bind(this);
    this.focusSearchInput = this.focusSearchInput.bind(this);
  }

  addProgram(program) {
    const {commandLineActions} = this.props;
    commandLineActions.addProgram({id: program.id});
    this.setState({
      programCompleterIsOpen: false,
      isProgramSelected: true,
      query: '',
      inputPlaceholder: 'Add an option',
      lastProgramId: program.id,
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
      isWaitingForValue: true,
      lastOptionId: option.id
    });
    this.focusSearchInput();
  }

  addValue(option, value) {
    const {commandLineActions} = this.props;
    commandLineActions.addValue({

    })
  }

  handleClick(e) {
    const {isProgramSelected, programCompleterIsOpen, isWaitingForValue} = this.state;
    e.preventDefault();
    if (!isProgramSelected && !programCompleterIsOpen) {
      this.setState({
        programCompleterIsOpen: !this.state.programCompleterIsOpen
      });
    } else if (isProgramSelected && !isWaitingForValue) {
      this.setState({
        optionCompleterIsOpen: !this.state.optionCompleterIsOpen
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  handleInputKeyDown(e) {
    const {isWaitingForValue} = this.state;
    const {commandLineActions} = this.props;
    if (e.key === 'Escape') {
      this.setState({
        optionCompleterIsOpen: false,
        programCompleterIsOpen: false,
        isWaitingForValue: false
      });
    }
    if (isWaitingForValue) {
      if (e.key === 'Enter') {
        commandLineActions.setOptionValue({
          id: this.state.lastOptionId ,
          programId: this.state.lastProgramId,
          value: this.state.query
        });
        this.setState({
          query: '',
          inputPlaceholder: 'Add an option',
          isWaitingForValue: false,
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
      programCompleterIsOpen: true
    })
  }

  focusSearchInput() {
    this.searchInput.focus();
  }

  copyCli() {
    const str = this.cliToString();
    copy(str);
  }

  render() {
    const {programCompleterIsOpen, optionCompleterIsOpen} = this.state;
    return (
      <div id="kommandr-container">
        <div className="actions-container">
          <div>
            <Button bsStyle="info" bsSize="small" onClick={this.copyCli}>Copy to clipboard!</Button>
            <Button bsStyle="danger" bsSize="small" onClick={this.resetCli}>Reset</Button>
          </div>
        </div>
        <div id="kommandr">
          <SelectedPrograms />

          <div className="search-container">
            <ProgramCompleterContainer items={this.props.programs} query={this.props.query} isOpen={programCompleterIsOpen} onClick={this.addProgram} />
            <OptionCompleterContainer query={this.props.query} isOpen={optionCompleterIsOpen} onClick={this.addOption} />
            <input ref={(input) => {this.searchInput = input;}} className="search-input" type="text" value={this.state.query} onKeyDown={this.handleInputKeyDown} placeholder={this.state.inputPlaceholder} onClick={this.handleClick} onChange={this.handleInputChange}></input>
          </div>
          <div className="clearfix" style={({height: 0})}></div>
        </div>
      </div>
    );
  }
}

export default CommandLine;

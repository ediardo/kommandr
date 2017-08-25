import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CommandLine from '../components/CommandLine';

import commandLineActions from '../redux/actions/commandLineActions';
import uiAction from '../redux/actions/completerActions';

const App = ({commandLine, programs, options, ui, actions}) => (
  <div className="app">
    <Header />
    <div className='container-fluid content'>
      <CommandLine programs={programs} options={options} commandLine={commandLine} ui={ui} commandLineActions={actions.commandLineActions} uiActions={actions.uiActions}/>
    </div>
    <Footer />
  </div>
);

const mapStateToProps = state => ({
  commandLine: state.commandLine,
  programs: state.programs,
  options: state.options,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
    actions: {
      commandLineActions: bindActionCreators(commandLineActions, dispatch),
      uiActions: bindActionCreators(uiAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

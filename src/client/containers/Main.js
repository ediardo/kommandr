import React, { Component }  from 'react';
import { Switch, Route } from 'react-router-dom';

import { CommandLine, ViewCommandLine } from '../components/CommandLine/';
import { ModalLogin, ModalHelp } from '../components/Modal/';

import {SidebarSearch} from '../components/Sidebar';
import ModalWelcome from '../components/Modal/ModalWelcome';

class Main extends Component{
  
  componentDidMount() {
    document.documentElement.classList.add('no-scroll');
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('no-scroll');
  }
  render() {
    return (
      <main className="d-flex">
        <div className="command-line-container d-flex flex-column">
          <Route path="/login" exact component={ModalLogin} />
          <Route path="/help" exact component={ModalHelp} />
          <Switch>
            <Route path="/k/:kommandrId" exact component={ViewCommandLine} />
            <Route path="/" component={CommandLine} />
          </Switch>
        </div>
        <SidebarSearch />
        <ModalWelcome />
      </main>
    )
  }
}

export default Main;

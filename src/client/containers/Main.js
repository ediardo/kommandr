import React  from 'react';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';

import { CommandLine, ViewCommandLine } from '../components/CommandLine/';
import Content from './Content';
import Sidebar from './Sidebar';
import SidebarSearch from '../components/Sidebar/SidebarSearch';
import ModalWelcome from '../components/Modal/ModalWelcome';

const Main = (props) => {
  return (
    <div>
      <ModalWelcome />
      <Content sidebarOffset>
        <Container fluid className="kommandr-container">
          <Switch>
            <Route path="/k/:kommandrId" component={ViewCommandLine} />
            <Route path="/" component={CommandLine} />
            
          </Switch>
        </Container>
      </Content>
      <Sidebar>
        <SidebarSearch {...props} />
      </Sidebar>
      <div className="clearfix"></div>
    </div>
  )
}

export default Main;

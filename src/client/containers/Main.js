import React  from 'react';

import { Container } from 'reactstrap';
import CommandLine from '../components/CommandLine';
import Content from './Content';
import Sidebar from './Sidebar';
import SidebarSearch from '../components/Sidebar/SidebarSearch';

const Main = (props) => {
  return (
    <span>
      <Content sidebarOffset>
        <Container fluid className="kommandr-container">
          <CommandLine {...props} />
        </Container>
      </Content>
      <Sidebar>
        <SidebarSearch {...props} />
      </Sidebar>
    </span>
  )
}

export default Main;

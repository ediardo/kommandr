import React  from 'react';
import { compose, graphql } from 'react-apollo';

import { Container } from 'reactstrap';
import CommandLineCreateMode from '../components/CommandLineCreateMode';
import CommandLineViewMode from '../components/CommandLineViewMode';
import CommandLine from '../components/CommandLine';
import Content from './Content';
import Sidebar from './Sidebar';
import SidebarSearch from '../components/Sidebar/SidebarSearch';

import kommandrById from '../queries/kommandrById';
import currentUser from '../queries/currentUser';

const Main = (props) => {
  if (props.data.loading) return <span>ASDASDASDA...</span>;
  var mode = 'create', kommandr = {};
  if (props.data) {
    mode = 'view';
    kommandr = props.data.kommandr;
  }

  return (
    <span>
      <Content sidebarOffset>
        <Container fluid className="kommandr-container">
          <CommandLine mode={mode} kommandr={kommandr} match={props.match} history={props.history} />
        </Container>
      </Content>
      <Sidebar>
        <SidebarSearch {...props} />
      </Sidebar>
    </span>
  )
}
export default graphql(kommandrById, {
    options: (props) => ({ variables: { id: props.match.params.id } }),
    skip: (ownProps) => !ownProps.match.params.hasOwnProperty('id')    
  })(Main);
//export default Main;

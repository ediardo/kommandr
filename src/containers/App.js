import React, { Component } from 'react';

import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';

import Content from './Content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommandLine from '../components/CommandLine';
import Sidebar from './Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Content>
          <Container fluid>
            <Nav tabs>
              <NavItem>
                <NavLink className={classNames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggleTab('1'); }}>
                  Tab1
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classNames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggleTab('2'); }}>
                  +
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <CommandLine />

              </TabPane>
              <TabPane tabId="2">

              </TabPane>
            </TabContent>
          </Container>
        </Content>
        <Sidebar>
          Content
        </Sidebar>
        <Footer />
      </div>
    )
  }
}

export default App;

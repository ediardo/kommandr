import React, { Component } from 'react';

import { Container } from 'reactstrap';

import Content from './Content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CommandLine from '../components/CommandLine';
import Sidebar from './Sidebar';

import 'holderjs/holder.js';

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
            <CommandLine />
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

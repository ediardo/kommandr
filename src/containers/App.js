import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import CommandLine from '../components/CommandLine';
import Contact from '../components/Contact';
import Content from './Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from './Main';
import Privacy from '../components/Privacy';
import Sidebar from './Sidebar';
import Terms from '../components/Terms';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Route path="/" exact component={Main} />
        <Route exact path="/new" component={CommandLine} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Footer />
      </div>
    )
  }
}

export default App;

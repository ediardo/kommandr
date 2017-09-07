import React from 'react';

import { Route } from 'react-router-dom';

import CommandLine from '../components/CommandLine';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from './Main';
import Privacy from '../components/Privacy';
import Terms from '../components/Terms';

const App = (props) => {
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
};

export default App;

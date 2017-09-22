import React from 'react';

import { Route, Switch } from 'react-router-dom';

import CommandLineWithNoData from '../components/CommandLineWithNoData';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from './Main';
import Privacy from '../components/Privacy';
import Profile from './Profile';
import Terms from '../components/Terms';
import CommandLineWithData from '../components/CommandLineWithData';

const App = (props) => {
  return (
    <div className="app">
      <Header />
        <Switch>
          <Route path="/" exact component={CommandLineWithNoData}/>} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/contact" component={Contact} />
          <Route path="/u/:username" component={Profile} />
          <Route path="/k/:hashId" exact component={CommandLineWithData} />
        </Switch>
      <Footer />
    </div>
  )
};

export default App;

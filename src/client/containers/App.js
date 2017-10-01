import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';

import CommandLineWithNoData from '../components/CommandLineWithNoData';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import Main from './Main';
import Privacy from '../components/Privacy';
import Profile from './Profile';
import Terms from '../components/Terms';
import CommandLineWithData from '../components/CommandLineWithData';
import ModalWelcome from '../components/Modal/ModalWelcome';
import currentUser from '../queries/currentUser';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/main.scss';


const App = (props) => {
  const { loading, currentUser } = props.data;
  return (
    <div className="app">
      { loading && <div style={{position: "absolute", background: "yellow", padding: "0.5rem"}}>Loading</div>}
      { !loading && currentUser && <ModalWelcome data={{ currentUser }} /> }
      <Header data={{ currentUser }} />
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

export default graphql(currentUser)(App);

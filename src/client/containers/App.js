import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';

import Main from './Main';
import Contact from '../components/Contact';
import EditProfile from './EditProfile';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import Privacy from '../components/Privacy';
import Profile from './Profile';
import Terms from '../components/Terms';
import ModalWelcome from '../components/Modal/ModalWelcome';
import currentUser from '../queries/currentUser';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/main.scss';

const App = (props) => {
  const { loading, currentUser } = props.data;
  return (
    <div className="app">
      { loading && <div className="loading-tag bg-warning">Loading...</div>}
      { !loading && currentUser && <ModalWelcome data={{ currentUser }} /> }
      <Header data={{ currentUser }} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/contact" component={Contact} />
          <Route path="/u/:username/edit" exact component={EditProfile} />
          <Route path="/u/:username" component={Profile} />
          <Route path="/k/:id" exact component={Main} />
        </Switch>
      <Footer />
    </div>
  )
};

export default graphql(currentUser)(App);

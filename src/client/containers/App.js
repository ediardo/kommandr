import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import Main from './Main';
import Contact from '../components/Contact';
import EditProfile from './EditProfile';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import Privacy from '../components/Privacy';
import Profile from './Profile';
import Terms from '../components/Terms';
import ModalWelcome from '../components/Modal/ModalWelcome';

import currentUser from '../graphql/queries/currentUser.gql';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/main.scss';

const App = ({ data: { loading, currentUser } }) => {
  return (
    <div className="app">
      { loading && <Loading />}
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

App.propTypes = {
  data: PropTypes.object,
};

export default compose(
  graphql(currentUser),
)(App);

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from './Main';
import Contact from '../components/Pages/Contact';
import EditProfile from './EditProfile';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Privacy from '../components/Pages/Privacy';
import Profile from './Profile';
import Terms from '../components/Pages/Terms';
import ModalWelcome from '../components/Modal/ModalWelcome';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/main.scss';

const App = props => {
  return (
    <div className="app">
      <ModalWelcome />
      <Header />
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

export default App;

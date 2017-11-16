import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';

import Main from './Main';
import Contact from '../components/Pages/Contact';
import Login from '../components/Modal/ModalLogin';
import Help from '../components/Modal/ModalHelp';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Privacy from '../components/Pages/Privacy';
import Profile from './Profile';
import Terms from '../components/Pages/Terms';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-s-alert/dist/s-alert-default.css';
import '../style/main.scss';

const App = props => {
  return (
    <div className="app">
      <Header />
        <Route path="/"  component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/help" exact component={Help} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />
        <Route path="/u/:username" component={Profile} />
      <Footer />
      <Alert stack={{limit: 3}} />      
    </div>
  )
};

App.propTypes = {
  data: PropTypes.object,
};

export default App;

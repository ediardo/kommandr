import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';

import Main from './Main';
import Contact from '../components/Pages/Contact';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Privacy from '../components/Pages/Privacy';
import Profile from './Profile';
import ProfileSettings from './ProfileSettings';
import Terms from '../components/Pages/Terms';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-s-alert/dist/s-alert-default.css';
import '../style/main.scss';

const App = props => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/u/:username" component={Profile} />
        <Route path="/privacy" exact component={Privacy} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/settings" component={ProfileSettings} />
        <Route path="/" component={Main} />
      </Switch>
      <Footer />
      <Alert stack={{limit: 3}} />      
    </div>
  )
};

App.propTypes = {
  data: PropTypes.object,
};

export default App;

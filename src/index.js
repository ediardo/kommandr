import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/App';
import reducer from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './style/main.scss';
import 'codemirror/lib/codemirror.css';
import 'holderjs/holder.js';

const middleware = [ thunkMiddleware ];
middleware.push(createLogger());


const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

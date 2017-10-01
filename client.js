import React from 'react';
import ReactDOM from 'react-dom';

import ApolloCLient from 'apollo-client';
import {
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

/*
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
*/
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/App';
//import reducer from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './style/main.scss';

//import 'holderjs/holder.js';

/*
const middleware = [ thunkMiddleware ];
middleware.push(createLogger());
const store = createStore(reducer, applyMiddleware(...middleware));
*/

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  },
});

const client = new ApolloCLient({ networkInterface: networkInterface })

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// @flow
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Layout from '../containers/Layout';
import { configureStore } from '../configureStore';

const store = configureStore();
const history = createHistory();

if (process.env.NODE_ENV !== 'production') {
  window.getState = store.getState;
}

class App extends Component {// eslint-disable-line
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

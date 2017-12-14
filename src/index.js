import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const rootEl = document.getElementById('app-container');
// Render to div with id App
if (rootEl) {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );
  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <App /> here rather than require() a <NextApp />.
      const NextApp = require('./containers/App').default; //eslint-disable-line

      render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl
      );
    });
  }
}

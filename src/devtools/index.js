import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { injectScript } from '../util/helpers';
import App from './App';

const store = new Store({
  portName
});

injectScript(chrome.extension.getURL('build/backend.js'), () => {
  store.ready().then(() => {
    render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById('root')
    );
  });
});

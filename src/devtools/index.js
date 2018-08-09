import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { injectScript } from '../util/helpers';
import App from './App';
import './styles.css';

const store = new Store({
  portName
});

injectScript(chrome.extension.getURL('build/backend.js'), () => {
  store.ready().then(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App theme={chrome.devtools.panels.themeName} />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
});

import { alias, wrapStore } from 'react-chrome-redux';
import { applyMiddleware, createStore } from 'redux'
import { portName } from '../config';
import { aliases } from '../core/aliases';
import app from '../core/reducers';

const store = createStore(app,
  applyMiddleware(
    alias(aliases)
  )
);

wrapStore(store, { portName });

chrome.runtime.onMessage.addListener((req, sender) => {
  if (sender.tab && req.strudelDetected) {
    chrome.browserAction.setIcon({
      tabId: sender.tab.id,
      path: {
        16: 'icons/icon16.png',
        48: 'icons/icon48.png',
        128: 'icons/icon128.png'
      }
    });
  }
})

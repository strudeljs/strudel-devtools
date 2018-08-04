import { wrapStore } from 'react-chrome-redux';
import { portName } from '../config';
import { createStore } from 'redux'
import app from '../core/reducers';

const store = createStore(app);

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

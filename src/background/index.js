import { alias, wrapStore } from 'react-chrome-redux';
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../core/sagas';
import { portName } from '../config';
import { setActiveTab } from '../core/actions';
import app from '../core/reducers';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(app,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

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

chrome.tabs.onActivated.addListener(function(activeInfo) {
  store.dispatch(setActiveTab({ id: activeInfo.tabId }));
});

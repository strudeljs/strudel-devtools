import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { ALIAS_TYPES } from '../core/aliases';
import { TYPES, init } from '../core/actions';

const store = new Store({
  portName
});

window.addEventListener('message', (e) => {
  if (e.source === window) {
    switch(e.data.action) {
      case TYPES.INIT:
        store.dispatch(init({
          version: e.data.version,
          components: e.data.components
        }));
      default:
        return;
    }
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type) {
      switch (request.type) {
        case ALIAS_TYPES.SELECT_COMPONENT:
          // TBD: collect more data on specific component instance
          return sendResponse({});
        default:
          return;
      }
    }
});

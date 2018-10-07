import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { ALIAS_TYPES } from '../core/aliases';
import { TYPES, init, eventTrigger } from '../core/actions';

const store = new Store({
  portName
});

window.addEventListener('message', (e) => {
  if (e.source === window && e.data.action) {
    switch (e.data.action) {
      case TYPES.INIT:
        store.dispatch(init({
          version: e.data.version,
          components: e.data.components
        }));
        break;
      case TYPES.EVENT:
        store.dispatch(eventTrigger({
          event: e.data.event
        }));
        break;
      case TYPES.SELECTED_COMPONENT_DATA:
        console.log(e.data.data);
        break;
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
          window.postMessage({
            action: TYPES.SELECT_COMPONENT,
            id: request.id,
          }, '*');
          return sendResponse({});
        default:
          return;
      }
    }
});

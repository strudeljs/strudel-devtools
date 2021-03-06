import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { ALIAS_TYPES, beforeWindowUnload } from '../core/actions';
import { TYPES, init, eventTrigger, selectedComponentData } from '../core/actions';
import { pageLoaded } from '../core/actions';
import { installScript } from '../util/helpers';

const store = new Store({
  portName
});

window.addEventListener('DOMContentLoaded', () => store.dispatch(pageLoaded()));

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
        store.dispatch(selectedComponentData({
          data: e.data.data
        }));
        break;
      case TYPES.BEFORE_WINDOW_UNLOAD:
        store.dispatch(beforeWindowUnload());
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
        case ALIAS_TYPES.SCROLL_INTO_VIEW:
          window.postMessage({
            action: TYPES.SCROLL_INTO_VIEW,
            id: request.id,
          }, '*');
          return sendResponse({});
        case ALIAS_TYPES.HIGHLIGHT_COMPONENT:
          window.postMessage({
            action: TYPES.HIGHLIGHT_COMPONENT,
            id: request.id,
          });
          return sendResponse({});
        case ALIAS_TYPES.REMOVE_HIGHLIGHT:
          window.postMessage({
            action: TYPES.REMOVE_HIGHLIGHT,
          });
          return sendResponse({});
        case ALIAS_TYPES.PAGE_LOADED:
          installScript(chrome.extension.getURL('build/backend.js'));
          return;
        default:
          return;
      }
    }
});

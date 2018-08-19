import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import {
  INIT, 
  SELECT_COMPONENT, 
  init, 
  selectComponent,
} from '../core/actions';

const store = new Store({
  portName
});

window.addEventListener('message', (e) => {
  if (e.source === window) {
    if (e.data.action === INIT) {
      store.dispatch(init({
        version: e.data.version,
        components: e.data.components
      }));
    } else if (e.data.action === SELECT_COMPONENT) {
      store.dispatch(selectComponent({
        id: e.data.id
      }));
    }
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("message from background received", request, sender);
    if (request.greeting == "hello") {
      sendResponse({farewell: "goodbye"});
    }
});

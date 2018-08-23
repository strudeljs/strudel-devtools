import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { init, eventTrigger } from '../core/actions';

const store = new Store({
  portName
});

window.addEventListener('message', (e) => {
  if (e.source === window && e.data.action) {
    switch (e.data.action) {
      case 'INIT': {
        store.dispatch(init({
          version: e.data.version,
          components: e.data.components
        }));
        break;
      }
      case 'EVENT-TRIGGER': {
        store.dispatch(eventTrigger({
          event: e.data.event
        }));
        break;
      }
    }
  }
});

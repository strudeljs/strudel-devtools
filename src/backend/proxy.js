import { Store } from 'react-chrome-redux';
import { portName } from '../config';
import { init } from '../core/actions';

const store = new Store({
  portName
});

window.addEventListener('message', (e) => {
  if (e.source === window && e.data.action) {
    store.dispatch(init({
      version: e.data.version,
      components: e.data.components
    }));
  }
});


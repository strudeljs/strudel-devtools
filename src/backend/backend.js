import { Store } from 'react-chrome-redux';
import { EXTENSION_ID, PORT_NAME } from '../options';
import { addComponent } from '../communication/actions'

const store = new Store({
  extensionId: EXTENSION_ID,
  portName: PORT_NAME
});

store.ready().then(() => {
  store.dispatch(addComponent('DUPA'));
});

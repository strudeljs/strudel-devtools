import { wrapStore } from 'react-chrome-redux';
import { EXTENSION_ID, PORT_NAME } from '../options';
import { createStore } from 'redux'
import app from '../communication/reducers';

const store = createStore(app);

wrapStore(store, {
  portName: PORT_NAME
});


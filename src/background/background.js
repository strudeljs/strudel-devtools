import { wrapStore } from 'react-chrome-redux';
import { CHANNEL } from '../options';
import { createStore } from 'redux'
import app from '../communication/reducers';

const store = createStore(app);

wrapStore(store, {portName: CHANNEL});

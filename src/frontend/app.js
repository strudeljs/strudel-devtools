import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import { EXTENSION_ID, PORT_NAME } from '../options';

import ComponentTree from './components/component-tree/component-tree';

const store = new Store({
  portName: PORT_NAME
});

store.ready().then(() => {
  render(
    <Provider store={store}>
      <ComponentTree
        components={store.getState()}/>
    </Provider>,
    document.getElementById('root')
  );
});

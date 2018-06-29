import { Store } from 'react-chrome-redux';
import { EXTENSION_ID, PORT_NAME } from './options';
import { addComponent, checkStrudel } from './communication/actions'

const store = new Store({
  portName: PORT_NAME
});

store.ready().then(() => {
  store.dispatch(addComponent('TEST'));
  store.dispatch(checkStrudel(initStrudel()));
});

const injectId = () => {
  var script = document.createElement('script');
  script.textContent = "var extensionId = " + JSON.stringify(chrome.runtime.id);
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

const injectScript = (file) => {
  const script = document.createElement('script');
  document.documentElement.appendChild(script);
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file);
  script.parentNode.removeChild(script);
}

const initStrudel = () => {
  const componentsScopes = [];
  const componentsElements = document.getElementsByClassName('strudel-init');
  console.log(componentsElements);
  componentsElements.forEach((element) => {
    componentsScopes.push(element.scope);
  });
  
  return componentsScopes;
}

injectId();
injectScript(chrome.extension.getURL('build/backend.js'));

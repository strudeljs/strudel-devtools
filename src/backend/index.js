import { init } from '../core/actions';
import { initEventsBackend } from './events';

const hook = window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__;
let uid = 0;

export function initBackend () {
  if (hook.Strudel) {
    connect()
  } else {
    hook.once('init', connect)
  }
}

const walk = (node, fn) => {
  if (node.childNodes) {
    for (let i = 0, l = node.childNodes.length; i < l; i++) {
      const child = node.childNodes[i];
      const stop = fn(child);
      if (!stop) {
        walk(child, fn);
      }
    }
  }
}

const getInstanceDetails = (instance) => {
  return {
    name: instance.constructor.name
  };
}

const scan = () => {
  var components = [];

  walk(document, function (node) {
    if (node.__strudel__) {
      const id = ++uid;
      const instance = node.__strudel__;
      instance.__STRUDEL_DEVTOOLS_UID__ = id;

      components.push({
        ...getInstanceDetails(instance),
         id
      });
    }

    return !node.childNodes;
  });

  initEventsBackend(hook.Strudel);

  window.postMessage({
    action: 'INIT',
    version: hook.Strudel.version,
    components: components
  }, '*');
}

const connect = () => {
  console.log('[strudel-devtools] Ready. Detected Strudel v' + hook.Strudel.version)
  document.addEventListener('strudel:loaded', scan);
  scan();
}

initBackend();

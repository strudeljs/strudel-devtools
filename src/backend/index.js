import { init, TYPES } from '../core/actions';
import { initEventsBackend } from './events';

const hook = window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__;
const components = [];

export function initBackend () {
  if (hook.Strudel) {
    connect()
  } else {
    hook.once('init', connect)
  }

  window.addEventListener('message', (e) => {
    if (e.source === window && e.data.action === TYPES.SELECT_COMPONENT) {
      window.postMessage({
        action: TYPES.SELECTED_COMPONENT_DATA,
        data: JSON.stringify(components[e.data.id - 1]),
      }, '*');
    }
  });
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
  let properties = {
    name: instance.constructor.name,
    selector: instance.__proto__._selector
  };

  Object.keys(instance).forEach((property) => {
    if (instance[property].constructor && instance[property].constructor.name !== 'Element') {
      properties[property] = instance[property];
    }
  });

  return properties;
}

const scan = () => {
  let uid = 0;

  walk(document, function (node) {
    if (node.__strudel__) {
      const id = ++uid;
      const instance = node.__strudel__;
      instance.__STRUDEL_DEVTOOLS_UID__ = id;

      components.push({
        id: id,
        strudelProps: getInstanceDetails(node.__strudel__)
      });
    }

    return !node.childNodes;
  });

  initEventsBackend(hook.Strudel);

  window.postMessage({
    action: TYPES.INIT,
    version: hook.Strudel.version,
    components: components.map(c => ({
      id: c.id,
      strudelProps: {
        name: c.strudelProps.name,
        selector: c.strudelProps.selector,
      }
    }))
  }, '*');
}

const connect = () => {
  console.log('[strudel-devtools] Ready. Detected Strudel v' + hook.Strudel.version)
  document.addEventListener('strudel:loaded', scan);
  scan();
}

initBackend();

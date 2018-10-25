import { init, TYPES } from '../core/actions';
import { initEventsBackend } from './events';
import { stringify } from 'flatted/esm';


const hook = window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__;
const strudelNodes = [];

export function initBackend () {
  if (hook.Strudel) {
    connect()
  } else {
    hook.once('init', connect)
  }

  window.addEventListener('message', (e) => {
    if (e.source === window && e.data.action === TYPES.SELECT_COMPONENT) {
      const selectedInstance = strudelNodes[e.data.id - 1].__strudel__;
      const instanceDetails = adaptInstanceDetails(selectedInstance);

      window.postMessage({
        action: TYPES.SELECTED_COMPONENT_DATA,
        data: stringify(instanceDetails),
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

  delete properties['$element'];
  delete properties['$data'];

  return properties;
}

const adaptInstanceDetails = instance => {
  const reservedKeys = [
    'name', 'selector', '$data', '$element', '__STRUDEL_DEVTOOLS_UID__'
  ];
  const adapted = {
    info: {
      name: instance.constructor.name,
      selector: instance.__proto__._selector,
    },
    dataAttrs: instance.$data,
    properties: {},
    elements: {},
  };

  Object.keys(instance).forEach((property) => {
    if (instance[property].constructor && instance[property].constructor.name === 'Element' &&
        property !== '$element') {
      adapted.elements[property] = instance[property];
    } else if (!reservedKeys.includes(property)) {
      adapted.properties[property] = instance[property];
    }
  });

  return adapted;
};

const scan = () => {
  var components = [];
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
      strudelNodes.push(node);
    }

    return !node.childNodes;
  });

  initEventsBackend(hook.Strudel);

  window.postMessage({
    action: TYPES.INIT,
    version: hook.Strudel.version,
    components,
  }, '*');
}

const connect = () => {
  document.addEventListener('strudel:loaded', scan);
  scan();
}

initBackend();

import { init } from '../core/actions';

const hook = window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__;

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

const getInstanceProperties = (instance) => {
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

const scan = () => {
  var components = [];
  let id = 1;

  walk(document, function (node) {
    if (node.__strudel__) {
      components.push({
        id: id++,
        strudelProps: getInstanceProperties(node.__strudel__) 
      });
    }

    return !node.childNodes;
  });

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

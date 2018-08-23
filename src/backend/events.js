import { stringify } from '../core/transfer';

const logEvent = (vm, type, eventName, payload) => {
  window.postMessage({
    action: 'EVENT-TRIGGER',
    event: {
      eventName,
      type,
      payload: stringify(payload),
      source: vm.constructor.name,
      timestamp: Date.now()
    }
  }, '*');
};

const initEventsBackend = (Strudel) => {
  const wrap = (method) => {
    const original = Strudel.EventEmitter.prototype[method];

      if (original) {
        Strudel.EventEmitter.prototype[method] = function (...args) {
          const res = original.apply(this, args);


          logEvent(this, method, args[0], args.slice(1));

          return res;
        }
      }
  }

  wrap('$emit');
};

export { initEventsBackend };

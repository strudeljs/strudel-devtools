export const omit = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
};

export const assignTabState = (state) => {
  return Object.assign({}, {
    selectedComponentId: state && state.selectedComponentId ? state.selectedComponentId : null,
    selectedComponentData: state && state.selectedComponentData ? state.selectedComponentData : null,
    components: state && state.components ? state.components : [],
    selectedEvent: state && state.selectedEvent ? state.selectedEvent : null,
    events: state && state.events ? state.events : [],
  });
};

export const getComponentName = (component) => {
  if (!component || !component.constructor) throw new Error("Provided parameter isn't valid Strudel Element");
  return component.constructor.name === "component"
    ? component.name                // Strudel >= 1.0.0
    : component.constructor.name;   // Strudel < 1.0.0
}

const deep = (obj, fn, last) => {
  // Primirives
  if(obj !== Object(obj)) return fn(obj);

  if(obj._seen === true || last === true) return;

  if(obj instanceof Element) last = true;

  const newObj = fn(obj);

  if(newObj instanceof HTMLFormElement || newObj instanceof HTMLCollection) {
    return newObj;
  }

  // Array
  if (Array.isArray(newObj)) {
    return newObj.map(e => deepMap(e, fn, last));
  }

  // Objects
  Object.keys(newObj).map(key => {
    try {
      newObj._seen = true;
      newObj[key] = deep(newObj[key], fn, last);
    } catch(err) {console.error('->', newObj, key, err)}
    if(newObj[key] === undefined) delete newObj[key];
  });

  delete newObj._seen;
  return newObj;
}

export const deepMap = (obj, fn) => {
  window.deepMap = deepMap;
  window.deep = deep;
  return deep(obj, fn, { seen: new WeakSet() });
}

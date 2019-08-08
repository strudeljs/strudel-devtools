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

const deep = (obj, fn) => {
  if (obj !== Object(obj)) return fn(obj);
  if (obj.__STRUDEL_DEVTOOLS_SEEN__ === true) return;

  const newObj = fn(obj);

  if (newObj instanceof HTMLFormElement || newObj instanceof HTMLCollection) {
    return newObj;
  }

  if (Array.isArray(newObj)) {
    return newObj.map(e => deepMap(e, fn));
  }

  Object.keys(newObj).map(key => {
    newObj.__STRUDEL_DEVTOOLS_SEEN__ = true;
    newObj[key] = deep(newObj[key], fn);
    if (newObj[key] === undefined) delete newObj[key];
  });

  delete newObj.__STRUDEL_DEVTOOLS_SEEN__;
  return newObj;
}

export const deepMap = (obj, fn) => {
  window.deepMap = deepMap;
  window.deep = deep;
  return deep(obj, fn, { seen: new WeakSet() });
}

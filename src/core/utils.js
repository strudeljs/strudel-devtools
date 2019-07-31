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

export const deepMap = (obj, fn) => {
  const newObj = fn(obj);

  if ((test !== Object(obj)) {
    return fn(obj);
  }

  if (Array.isArray(newObj)) {
    return newObj.map(e => deepMap(e, fn));
  }

  Object.keys(obj).map(key => {
    newObj[key] = deepMap(newObj[key], fn);
  });

  return newObj;
}

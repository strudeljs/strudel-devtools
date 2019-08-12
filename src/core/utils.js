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

/*
  Executing `fn` function and passing `obj` as a parameter.
  If result is primitive, returns it.
  If result is Array, returns new array with the results of calling `deepMapStrudelInstance` function for every array element.
  If result is Object, returns it after executing `deepMapStrudelInstance` function for all its fields.

  Function deletes undefined fields and removes circular references in objects.
*/
export const deepMapStrudelInstance = (obj, fn) => {
    if (!obj || obj.__STRUDEL_DEVTOOLS_SEEN__ === true) return;

    const newObj = fn(obj);

    if (obj !== Object(obj)) return newObj;

    if (Array.isArray(newObj)) {
      return newObj.map(e => deepMapStrudelInstance(e, fn));
    }

    Object.keys(newObj).map(key => {
      newObj.__STRUDEL_DEVTOOLS_SEEN__ = true;
      newObj[key] = deepMapStrudelInstance(newObj[key], fn);
      if (newObj[key] === undefined) delete newObj[key];
    });

    delete newObj.__STRUDEL_DEVTOOLS_SEEN__;
    return newObj;
}

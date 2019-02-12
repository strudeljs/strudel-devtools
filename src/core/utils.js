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

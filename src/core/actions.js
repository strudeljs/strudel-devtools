export const TYPES = {
  FLUSH: 'FLUSH',
  INIT: 'INIT',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  SELECTED: 'SELECTED',
  EVENT: 'EVENT',
  FLUSH_EVENT: 'FLUSH_EVENT',
  SELECT_EVENT: 'SELECT_EVENT'
};

export const init = ({ version, components }) => ({ type: TYPES.INIT, version, components });

export const selectComponent = ({ id }) => ({ type: TYPES.SELECT_COMPONENT, id });

export const eventTrigger = ({ event }) => ({ type: TYPES.EVENT, event });

export const flushEvent = () => ({ type: TYPES.FLUSH_EVENT });

export const selectEvent = (event) => ({ type: TYPES.SELECT_EVENT, event });

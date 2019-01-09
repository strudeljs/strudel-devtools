export const TYPES = {
  FLUSH: 'FLUSH',
  INIT: 'INIT',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  SELECTED_COMPONENT_DATA: 'SELECTED_COMPONENT_DATA',
  SELECTED: 'SELECTED',
  EVENT: 'EVENT',
  FLUSH_EVENT: 'FLUSH_EVENT',
  SELECT_EVENT: 'SELECT_EVENT',
  SCROLL_INTO_VIEW: 'SCROLL_INTO_VIEW',
  SET_ACTIVE_TAB_ID: 'SET_ACTIVE_TAB_ID',
};

export const ALIAS_TYPES = Object.keys(TYPES).reduce((aliases, action) => ({
  ...aliases,
  [action]: `${action}_ALIAS`,
}), {});

export const init = ({ version, components }) => ({ type: TYPES.INIT, version, components });

export const selectComponent = (id) => ({ type: TYPES.SELECT_COMPONENT, id });

export const scrollIntoView = (id) => ({ type: TYPES.SCROLL_INTO_VIEW, id });

export const selectedComponentData = ({ data }) => ({ type: TYPES.SELECTED_COMPONENT_DATA, data });

export const eventTrigger = ({ event }) => ({ type: TYPES.EVENT, event });

export const flushEvent = () => ({ type: TYPES.FLUSH_EVENT });

export const selectEvent = (event) => ({ type: TYPES.SELECT_EVENT, event });

export const setActiveTabId = ({ id }) => ({ type: TYPES.SET_ACTIVE_TAB_ID, id });
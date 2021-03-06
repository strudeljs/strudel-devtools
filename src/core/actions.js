export const TYPES = {
  FLUSH: 'FLUSH',
  FLUSH_TAB: 'FLUSH_TAB',
  INIT: 'INIT',
  PAGE_LOADED: 'PAGE_LOADED',
  AFTER_PAGE_LOADED: 'AFTER_PAGE_LOADED',
  BEFORE_WINDOW_UNLOAD: 'BEFORE_WINDOW_UNLOAD',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  SELECTED_COMPONENT_DATA: 'SELECTED_COMPONENT_DATA',
  SELECTED: 'SELECTED',
  EVENT: 'EVENT',
  FLUSH_EVENT: 'FLUSH_EVENT',
  SELECT_EVENT: 'SELECT_EVENT',
  SCROLL_INTO_VIEW: 'SCROLL_INTO_VIEW',
  HIGHLIGHT_COMPONENT: 'HIGHLIGHT_COMPONENT',
  REMOVE_HIGHLIGHT: 'REMOVE_HIGHLIGHT',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
};

export const ALIAS_TYPES = Object.keys(TYPES).reduce((aliases, action) => ({
  ...aliases,
  [action]: `${action}_ALIAS`,
}), {});

export const init = ({ version, components }) => ({ type: TYPES.INIT, version, components });

export const selectComponent = (id) => ({ type: TYPES.SELECT_COMPONENT, id });

export const scrollIntoView = (id) => ({ type: TYPES.SCROLL_INTO_VIEW, id });

export const highlightComponent = (id) => ({ type: TYPES.HIGHLIGHT_COMPONENT, id });

export const removeHighlight = () => ({ type: TYPES.REMOVE_HIGHLIGHT });

export const selectedComponentData = ({ data }) => ({ type: TYPES.SELECTED_COMPONENT_DATA, data });

export const eventTrigger = ({ event }) => ({ type: TYPES.EVENT, event });

export const flushEvent = () => ({ type: TYPES.FLUSH_EVENT });

export const selectEvent = (event) => ({ type: TYPES.SELECT_EVENT, event });

export const setActiveTab = ({ id }) => ({ type: TYPES.SET_ACTIVE_TAB, id });

export const beforeWindowUnload = () => ({ type: TYPES.BEFORE_WINDOW_UNLOAD });

export const pageLoaded = () => ({ type: TYPES.PAGE_LOADED });

export const afterPageLoaded = () => ({ type: TYPES.AFTER_PAGE_LOADED });

export const flushTab = (id) => ({ type: TYPES.FLUSH_TAB, id });
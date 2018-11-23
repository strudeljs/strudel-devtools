import {
  TYPES,
  selectComponent,
  scrollIntoView,
} from './actions';

export const ALIAS_TYPES = Object.keys(TYPES).reduce((aliases, action) => ({
  ...aliases,
  [action]: `${action}_ALIAS`,
}), {});

export const aliasCreators = { 
  selectComponent: ({ id }) => ({
    type: ALIAS_TYPES.SELECT_COMPONENT,
    id,
  }),
  scrollIntoView: ({ id }) => ({
    type: ALIAS_TYPES.SCROLL_INTO_VIEW,
    id,
  }),
};

export const aliases = {};
aliases[ALIAS_TYPES.SELECT_COMPONENT] = (data) => {
  chrome.tabs.query({ active: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: ALIAS_TYPES.SELECT_COMPONENT, id: data.id });
  });
  return selectComponent({ id: data.id });
}

aliases[ALIAS_TYPES.SCROLL_INTO_VIEW] = (data) => {
  chrome.tabs.query({ active: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: ALIAS_TYPES.SCROLL_INTO_VIEW, id: data.id });
  });
  return scrollIntoView({ id: data.id });
}
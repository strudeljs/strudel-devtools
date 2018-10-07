import { TYPES, selectComponent } from './actions';

export const ALIAS_TYPES = Object.keys(TYPES).reduce((aliases, action) => ({
  ...aliases,
  [action]: `${action}_ALIAS`,
}), {});

export const aliasCreators = { 
  selectComponent: ({ id }) => ({
    type: ALIAS_TYPES.SELECT_COMPONENT,
    id,
  }),
};

export const aliases = {};
aliases[ALIAS_TYPES.SELECT_COMPONENT] = (data) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: ALIAS_TYPES.SELECT_COMPONENT, id: data.id });
  });
  return selectComponent({ id: data.id });
}

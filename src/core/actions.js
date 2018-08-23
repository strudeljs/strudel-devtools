export const TYPES = {
  INIT: 'INIT',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
};

export const init = ({ version, components }) => {
  return { type: TYPES.INIT, version, components };
};

export const selectComponent = ({ id }) => {
  return { type: TYPES.SELECT_COMPONENT, id };
};
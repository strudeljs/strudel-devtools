export const TYPES = {
  INIT: 'INIT',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
};

export const init = ({ version, components }) => ({ type: TYPES.INIT, version, components });

export const selectComponent = ({ id }) => ({ type: TYPES.SELECT_COMPONENT, id });

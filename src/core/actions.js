export const INIT = 'INIT';
export const SELECT_COMPONENT = 'SELECT_COMPONENT';

export const init = ({ version, components }) => {
  return { type: INIT, version, components };
};

export const selectComponent = ({ index }) => {
  return { type: SELECT_COMPONENT, index };
};
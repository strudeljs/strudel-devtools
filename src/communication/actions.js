export const ADD_COMPONENT = 'ADD_COMPONENT';
export const CHECK_STRUDEL = 'CHECK_STRUDEL';

export const addComponent = (component) => {
  return { type: ADD_COMPONENT, component }
}

export const checkStrudel = (componentsScopes) => {
  return { type: CHECK_STRUDEL, componentsScopes }
}

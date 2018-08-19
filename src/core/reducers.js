import {
  INIT,
  SELECT_COMPONENT,
} from './actions';

const initialState = {
  version: '',
  selectedComponentId: null,
  components: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return Object.assign({}, state, {
        version: action.version,
        components: action.components
      });
    case SELECT_COMPONENT:
      return Object.assign({}, state, { selectedComponentId: action.id });
    default:
      return state
  }
}

export default app;

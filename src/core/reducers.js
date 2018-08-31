import { TYPES } from './actions';

const initialState = {
  version: '',
  selectedComponentId: null,
  components: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return Object.assign({}, state, {
        version: action.version,
        components: action.components
      });
    case TYPES.SELECT_COMPONENT:
      return Object.assign({}, state, { selectedComponentId: action.id });
    default:
      return state
  }
}

export default app;

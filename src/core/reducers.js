import {
  INIT,
} from './actions';

const initialState = {
  version: '',
  components: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return Object.assign({}, state, {
        version: action.version,
        components: action.components
      });
    default:
      return state
  }
}

export default app;


import {
  INIT,
  SELECT_COMPONENT,
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
    case SELECT_COMPONENT:
      return Object.assign({}, state, {
        components: state.components.map(
          (component, index) => Object.assign({}, component, { selected: action.index === index })
        )
      });
    default:
      return state
  }
}

export default app;

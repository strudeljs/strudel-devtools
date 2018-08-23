import {
  INIT,
  EVENT,
  SELECTED,
  FLUSH_EVENT
} from './actions';

const initialState = {
  version: '',
  selected: '',
  events: [],
  components: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return Object.assign({}, state, {
        version: action.version,
        components: action.components
      });
    case SELECTED:
      return Object.assign({}, state, {
        selected: action.id
      });
    case EVENT:
      return Object.assign({}, state, {
        events: [...state.events, action.event]
      });
    case FLUSH_EVENT:
      return Object.assign({}, state, {
        events: []
      });
    default:
      return state
  }
}

export default app;


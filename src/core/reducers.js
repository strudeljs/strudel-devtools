import {
  FLUSH,
  INIT,
  EVENT,
  SELECTED,
  FLUSH_EVENT,
  SELECTED_EVENT
} from './actions';
import { parse } from './transfer';
import { omit } from './utils';

const initialState = {
  version: '',
  selected: '',
  selectedEvent: false,
  events: [],
  components: []
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case FLUSH:
      return Object.assign({}, state, initialState);
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
        events: [],
        selectedEvent: false
      });
    case SELECTED_EVENT:
      const payload = parse(action.event.payload);

      return Object.assign({}, state, {
        selectedEvent: { ...omit(action.event, 'timestamp'), payload }
      });
    default:
      return state
  }
}

export default app;


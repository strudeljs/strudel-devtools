import { parse as flattedParse } from 'flatted/esm';
import { TYPES } from './actions';
import { parse } from './transfer';
import { omit } from './utils';

const initialState = {
  activeTabId: null,
  version: '',
  selectedComponentId: null,
  selectedComponentData: null,
  selectedEvent: null,
  events: [],
  components: []
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_ACTIVE_TAB_ID:
      return Object.assign({}, state, { activeTabId: action.id });
    case TYPES.FLUSH:
      return Object.assign({}, state, initialState);
    case TYPES.INIT:
      return Object.assign({}, state, {
        version: action.version,
        components: action.components
      });
    case TYPES.SELECT_COMPONENT:
      return Object.assign({}, state, { selectedComponentId: action.id })
    case TYPES.SELECTED_COMPONENT_DATA:
      return Object.assign({}, state, { selectedComponentData: flattedParse(action.data) });
    case TYPES.EVENT:
      return Object.assign({}, state, {
        events: [...state.events, action.event]
      });
    case TYPES.FLUSH_EVENT:
      return Object.assign({}, state, {
        events: [],
        selectedEvent: false
      });
    case TYPES.SELECT_EVENT:
      const payload = parse(action.event.payload);

      return Object.assign({}, state, {
        selectedEvent: { ...omit(action.event, 'timestamp'), payload }
      });
    default:
      return state
  }
}

export default app;


import {
  ADD_COMPONENT,
} from './actions';

const initialState = {
  components: []
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPONENT:
      return Object.assign({}, state, {
        components: [...state.components, action.component]
      })
    default:
      return state
  }
}

export default app;


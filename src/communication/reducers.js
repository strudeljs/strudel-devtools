import {
  ADD_COMPONENT,
  CHECK_STRUDEL,
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
    case CHECK_STRUDEL: 
      return Object.assign({}, state, {
        components: action.componentsScopes
      }) 
    default:
      return state
  }
}

export default app;


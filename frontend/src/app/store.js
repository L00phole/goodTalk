import { configureStore } from "@reduxjs/toolkit";

const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: counterReducer,
});

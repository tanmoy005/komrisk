// rootReducer.ts
import { combineReducers } from 'redux';
import counterSlice from './slices/counter-slice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

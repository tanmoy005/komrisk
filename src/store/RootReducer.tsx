// rootReducer.ts
import { combineReducers } from 'redux';
import baseUrlSlice from './slices/base-url-slice';
import loginDataSlice from './slices/login-data-slice';
import userCredeintialSlice from './slices/user-credential-slice';

const rootReducer = combineReducers({
  baseUrl: baseUrlSlice,
  useCredential: userCredeintialSlice,
  loggedUserDetails: loginDataSlice


  // Add other reducers as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

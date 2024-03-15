import { combineReducers } from "@reduxjs/toolkit";
import baseUrlSlice from "./slices/base-url-slice";
import authUserCredSlice from "./slices/auth-user-cred-slice";

const rootReducer = combineReducers({
    baseUrl: baseUrlSlice,
    authUserCred: authUserCredSlice,
    
    // Add other reducers as needed
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
import { combineReducers } from "@reduxjs/toolkit";
import baseUrlSlice from "./slices/base-url-slice";

const rootReducer = combineReducers({
    baseUrl: baseUrlSlice,
    
    // Add other reducers as needed
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
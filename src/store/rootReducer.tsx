import { combineReducers } from "@reduxjs/toolkit";
import baseUrlSlice from "./slices/base-url-slice";
import authUserCredSlice from "./slices/auth-user-cred-slice";
import authUserAccessDetailsSlice from "./slices/auth-user-access-details-slice";
import authUserDetailsSlice from "./slices/auth-user-details-slice";
import incidentAvailableViewsSlice from "./slices/incident-available-views-slice";

const rootReducer = combineReducers({
    baseUrl: baseUrlSlice,
    authUserCred: authUserCredSlice,
    authUserDetails: authUserDetailsSlice,
    authUserAccess: authUserAccessDetailsSlice,
    incidentAvailableViews: incidentAvailableViewsSlice
    // Add other reducers as needed
});


export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
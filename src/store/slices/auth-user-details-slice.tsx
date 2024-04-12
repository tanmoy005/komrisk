import { DefaultAuthUserDetails, userAuthDetails } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"

interface AuthUserCredState {
    payload: userAuthDetails; // Define the type of the payload
}
const initialState: AuthUserCredState = {
    payload: DefaultAuthUserDetails,
};
const AuthUserDetailsSlice = createSlice({
    name: "authUserDetailsSlice",
    initialState,
    reducers: {
        storeAuthUserDetails(state, action: AuthUserCredState) {
            state.payload = action.payload;
        },
        removeAuthUserDetails(state, action) {
            state = initialState
        }
    }
})

export default AuthUserDetailsSlice.reducer
export const { storeAuthUserDetails, removeAuthUserDetails } = AuthUserDetailsSlice.actions;
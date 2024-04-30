import { AccessDetails, DefaultAccessDetails } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"



interface AuthUserAccessDetailsState {
    payload: AccessDetails; // Define the type of the payload
}
const initialState: AuthUserAccessDetailsState = {
    payload: DefaultAccessDetails,
};
const AuthUserAccessDetailsSlice = createSlice({
    name: "authUserAccessDetailsSlice",
    initialState,
    reducers: {
        storeAuthUserAccessDetails(state, action: AuthUserAccessDetailsState) {
            state.payload = action.payload;
        },
        removeAuthUserAccessDetails(state) {
            state.payload = DefaultAccessDetails
        }
    }
})

export default AuthUserAccessDetailsSlice.reducer
export const { storeAuthUserAccessDetails, removeAuthUserAccessDetails } = AuthUserAccessDetailsSlice.actions;
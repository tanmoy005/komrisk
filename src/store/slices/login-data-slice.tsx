import { UserDetails } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"

interface UserDetailsState {
    payload: UserDetails
}
const initialState: UserDetailsState = {
    payload: {
        token: null,
        userDetails: {
          userId: 0,
          username: "",
          firstName: "",
          lastName: "",
          displayName: "",
          phone: null,
          mobile: null,
          role: "",
          company: "",
          operatingUnit: "",
          department: "",
          wipEnabled: null,
          actualDateCompletionAllowed: null,
          requestReassignmentAllowed: null,
          uploadLink: null,
          dateTimePicker: null
        }
    }
};


const LoginDataSlice = createSlice({
    name: "loginDataSlice",
    initialState,
    reducers: {
        storeUserDetails(state, action: UserDetailsState) {
            console.log("action", action);
            state.payload = action.payload;
            console.log('state', state);

            // state.push(action.payload);
        },
        removeUserDetails(state) {
            state = initialState;
        },
    }
})

export default LoginDataSlice.reducer
export const { storeUserDetails, removeUserDetails } = LoginDataSlice.actions;
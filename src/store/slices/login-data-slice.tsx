import { UserCredentialsPayload } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    data: {},
};
const LoginDataSlice = createSlice({
    name: "loginDataSlice",
    initialState,
    reducers: {
        storeLoginData(state, action: UserCredentialsPayload) {
            console.log("action", action);
            state.data = action.payload;
            console.log('state', state);

            // state.push(action.payload);
        },
        removeLoginData(state, action) {
            state.data = {};
        },
    }
})

export default LoginDataSlice.reducer
export const { storeLoginData, removeLoginData } = LoginDataSlice.actions;
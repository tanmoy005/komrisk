import { createSlice } from "@reduxjs/toolkit"

interface AuthUserCredState {
    payload: { username: string, password: string }; // Define the type of the payload
}
const initialState: AuthUserCredState = {
    payload: { username: "", password: "" },
};
const AuthUserCredSlice = createSlice({
    name: "authUserCredSlice",
    initialState,
    reducers: {
        storeAuthUserCred(state, action: AuthUserCredState) {
            state.payload = action.payload;
        },
        removeAuthUserCred(state, action) {
            state = initialState
        }
    }
})

export default AuthUserCredSlice.reducer
export const { storeAuthUserCred, removeAuthUserCred } = AuthUserCredSlice.actions;
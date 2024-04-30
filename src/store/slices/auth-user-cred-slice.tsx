import { createSlice } from "@reduxjs/toolkit"
import { UserModel, DefaultUserModel } from "@/src/types"

interface AuthUserCredState {
    payload: UserModel; // Define the type of the payload
}
const initialState: AuthUserCredState = {
    payload: DefaultUserModel,
};


const AuthUserCredSlice = createSlice({
    name: "authUserCredSlice",
    initialState,
    reducers: {
        storeAuthUserCred(state, action: AuthUserCredState) {
            state.payload = action.payload;
        },
        removeAuthUserCred(state) {
            state.payload = DefaultUserModel
        }
    }
})

export default AuthUserCredSlice.reducer
export const { storeAuthUserCred, removeAuthUserCred } = AuthUserCredSlice.actions;
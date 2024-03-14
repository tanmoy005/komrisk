import { UserModel } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"

interface UserCredentialState {
    payload: UserModel
}
const initialState: UserCredentialState = {
    payload: {
        username: "",
        password: ""
    }
};


const UserCredentialSlice = createSlice({
    name: "baseUrlSlice",
    initialState,
    reducers: {
        storeUserCredential(state, action: UserCredentialState) {
            console.log("action", action);
            state.payload = action.payload;

            // state.push(action.payload);
        },
        removeUserCredential(state) {
            state = initialState

        },
    }
})

export default UserCredentialSlice.reducer
export const { storeUserCredential, removeUserCredential } = UserCredentialSlice.actions;
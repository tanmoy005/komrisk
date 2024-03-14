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


const UserCredeintialSlice = createSlice({
    name: "userCredeintialSlice",
    initialState,
    reducers: {
        storeUserCredential(state, action: UserCredentialState) {
            console.log("action", action);
            state.payload = action.payload;
            console.log('state', state);

            // state.push(action.payload);
        },
        removeUserCredential(state) {
            state = initialState
        },
    }
})

export default UserCredeintialSlice.reducer
export const { storeUserCredential, removeUserCredential } = UserCredeintialSlice.actions;
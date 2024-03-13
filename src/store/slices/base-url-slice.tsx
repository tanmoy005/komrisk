import { createSlice,PayloadAction  } from "@reduxjs/toolkit"

interface SomeAction {
    payload: { workSpaceName: String }; // Define the type of the payload
}
const initialState = {
    data: {},
};
const BaseUrlSlice = createSlice({
    name: "baseUrlSlice",
    initialState,
    reducers: {
        storeBaseUrl(state, action: SomeAction) {
            console.log("action", action);
            state.data = action.payload;
            console.log('state', state);

            // state.push(action.payload);
        },
        removeBaseUrl(state, action) {
           state.data = {}

        },
    }
})

export default BaseUrlSlice.reducer
export const { storeBaseUrl, removeBaseUrl } = BaseUrlSlice.actions;
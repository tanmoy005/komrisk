import { createSlice } from "@reduxjs/toolkit"
import { BaseUrlWorkspace,DefaultBaseUrlWorkspace } from "@/src/types"

interface BaseUrlState {
    payload: BaseUrlWorkspace; // Define the type of the payload
}
const initialState: BaseUrlState = {
    payload: DefaultBaseUrlWorkspace,
};
const BaseUrlSlice = createSlice({
    name: "baseUrlSlice",
    initialState,
    reducers: {
        storeBaseUrl(state, action: BaseUrlState) {
            state.payload = action.payload;
        },
        removeBaseUrl(state) {
            state.payload = DefaultBaseUrlWorkspace
        },
    }
})

export default BaseUrlSlice.reducer
export const { storeBaseUrl, removeBaseUrl } = BaseUrlSlice.actions;
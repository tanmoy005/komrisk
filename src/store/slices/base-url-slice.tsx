import { createSlice } from "@reduxjs/toolkit"

interface BaseUrlState {
    payload: { workSpaceName: string, baseUrl: string }; // Define the type of the payload
}
const initialState: BaseUrlState = {
    payload: { workSpaceName: "", baseUrl: "" },
};
const BaseUrlSlice = createSlice({
    name: "baseUrlSlice",
    initialState,
    reducers: {
        storeBaseUrl(state, action: BaseUrlState) {
            state.payload = action.payload;
        },
        removeBaseUrl(state, action) {
            state = initialState
        },
    }
})

export default BaseUrlSlice.reducer
export const { storeBaseUrl, removeBaseUrl } = BaseUrlSlice.actions;
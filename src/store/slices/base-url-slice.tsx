import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface BaseURLState {
    payload: {
        workspaceName: string;
        baseUrl: string;
    }
}
const initialState: BaseURLState = {
    payload: {
        workspaceName: "",
        baseUrl: ""
    }
};


const BaseUrlSlice = createSlice({
    name: "baseUrlSlice",
    initialState,
    reducers: {
        storeBaseUrl(state, action: BaseURLState) {
            console.log("action", action);
            state.payload.workspaceName = action.payload.workspaceName;
            state.payload.baseUrl = action.payload.baseUrl;
            console.log('state', state);

            // state.push(action.payload);
        },
        removeBaseUrl(state) {
            state.payload.workspaceName = ""
            state.payload.baseUrl = ""

        },
    }
})

export default BaseUrlSlice.reducer
export const { storeBaseUrl, removeBaseUrl } = BaseUrlSlice.actions;
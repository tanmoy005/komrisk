import { availableViews, defaultAvailableViews } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"



interface IncidentAvailableViewsState {
    payload: availableViews[]; // Define the type of the payload
}
const initialState: IncidentAvailableViewsState = {
    payload: [defaultAvailableViews],
};
const IncidentAvailableViewsSlice = createSlice({
    name: "incidentAvailableViewsSlice",
    initialState,
    reducers: {
        storeIncidentAvailableViews(state, action: IncidentAvailableViewsState) {
            state.payload = action.payload;
        },
        removeIncidentAvailableViews(state) {
            state.payload = [defaultAvailableViews]
        }
    }
})

export default IncidentAvailableViewsSlice.reducer
export const { storeIncidentAvailableViews, removeIncidentAvailableViews } = IncidentAvailableViewsSlice.actions;
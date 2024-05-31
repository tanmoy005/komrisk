import { notificationSeen } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit"



interface notificationSeenState {
    payload: notificationSeen[]; // Define the type of the payload
}
// const initialState: CommentsState = {
//     commentsList: [],
//   };

const initialState: notificationSeenState = {

    payload: [],
};

const notificationSeenSlice = createSlice({
    name: "notificationSeenSlice",
    initialState,
    reducers: {
        storeNotificationSeen(state, action: notificationSeenState) {
            state.payload = action.payload;
        },
        removeNotificationSeen(state) {
            state.payload = []
        }
    }
})

export default notificationSeenSlice.reducer
export const { storeNotificationSeen, removeNotificationSeen } = notificationSeenSlice.actions;
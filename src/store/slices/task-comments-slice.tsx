import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Comment } from "@/src/types";
//import { WritableDraft } from 'immer';
//import { Draft } from 'immer';


interface CommentsState {
  commentsList: Comment[][];
}

const initialState: CommentsState = {
  commentsList: [],
};

const CommentsSlice = createSlice({
    name: "commentsSlice",
    initialState,
    reducers: {
      addComment(state, action: PayloadAction<Comment>) {
        state.commentsList.push([action.payload]);
      },
      removeComment(state, action: PayloadAction<{ index: number }>) {
        const { index } = action.payload;
        state.commentsList.splice(index, 1);
      },
      removeAllComments(state) {
        state.commentsList = [];
      },
      updateComment(state, action: PayloadAction<Comment>) {
        const { taskID, commentText } = action.payload;
        const index = state.commentsList.findIndex((comments) => comments[0].taskID === taskID);
        if (index !== -1) {
          state.commentsList.splice(index, 1);
          state.commentsList.push([action.payload]);
        }
      },
    },
  });
  
  

export const { addComment, removeComment, removeAllComments,updateComment } = CommentsSlice.actions;
export default CommentsSlice.reducer;


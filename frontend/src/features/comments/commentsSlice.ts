import { IComment } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewComment, getCommentsByQuery } from './commentsThunk.ts';
import { RootState } from '../../app/store.ts';

interface commentState {
  comments: IComment[];
  isLoading: boolean,
  error: boolean,
}

const initialState: commentState = {
  comments: [],
  isLoading: false,
  error: false,
}

export const selectComments = (state: RootState) => state.comments.comments;
export const selectLoadingComments = (state: RootState) => state.comments.isLoading;
export const selectErrorComments = (state: RootState) => state.comments.error;

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByQuery.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCommentsByQuery.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.isLoading = false;
        state.comments = action.payload
      })
      .addCase(getCommentsByQuery.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addNewComment.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addNewComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewComment.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
  }})

export const commentsReducer = commentsSlice.reducer
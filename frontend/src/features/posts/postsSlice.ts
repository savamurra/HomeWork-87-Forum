import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import { addNewPost, fetchPosts, getPostById } from './postsThunk.ts';


export interface IPost {
  _id: string;
  user: { username: string };
  title: string;
  image: string | null;
  description: string;
  datetime: string;
}

interface PostState {
  posts: IPost[],
    postDetails: IPost | null,
  isLoading: boolean,
  error: boolean,
}

const initialState: PostState = {
  posts: [],
    postDetails: null,
  isLoading: false,
  error: false,
};

export const selectPost = (state: RootState) => state.posts.posts;
export const selectPostDetails = (state: RootState) => state.posts.postDetails;
export const selectLoading = (state: RootState) => state.posts.isLoading;
export const selectError = (state: RootState) => state.posts.error;


export const slicePosts = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
        .addCase(getPostById.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(getPostById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postDetails = action.payload;
        })
        .addCase(getPostById.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
        .addCase(addNewPost.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
        .addCase(addNewPost.fulfilled, (state) => {
          state.isLoading = false;
        })
        .addCase(addNewPost.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
  },
});

export const postsReducer = slicePosts.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';


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
  isLoading: boolean,
  error: boolean,
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const selectPost = (state: RootState) => state.posts.posts;

export const fetchPosts = createAsyncThunk<IPost[], void, { state: RootState }>(
  "posts/fetchPosts",
  async (_, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      throw new Error("No token found");
    }
    const response = await axiosApi.get("/posts", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
);

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
      });
  },
});

export const postsReducer = slicePosts.reducer;



import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';
import { IPost } from './postsSlice.ts';

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


export const getPostById = createAsyncThunk<IPost, string>(
  'posts/getPostById',
  async (id) => {
    const { data } = await axiosApi.get<IPost>(`/posts/${id}`);
    console.log('Post data:', data);
    return data;
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IPost } from './postsSlice.ts';

export const fetchPosts = createAsyncThunk<IPost[], void>(
  "posts/fetchPosts",
  async () => {
    const response = await axiosApi.get("/posts");
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

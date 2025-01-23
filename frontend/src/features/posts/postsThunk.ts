import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IPost } from './postsSlice.ts';
import { PostMutation } from '../../types';

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

export const addNewPost = createAsyncThunk<void, PostMutation, { state: RootState }>(
  'posts/addNewPost',
  async (postMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!token) {
      console.error('No token found');
    }

    const formData = new FormData();
    const keys = Object.keys(postMutation) as (keyof PostMutation)[];

    keys.forEach((key) => {
      const value = postMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/posts/', formData, {
      headers: {
        Authorization: token,
      },
    });
  }
);

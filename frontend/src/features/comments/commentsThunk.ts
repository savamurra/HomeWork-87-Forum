import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment, ICommentMutation } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { RootState } from "../../app/store.ts";

export const getCommentsByQuery = createAsyncThunk<IComment[], string>(
  "comments/getCommentsByQuery",
  async (post) => {
    const response = await axiosApi.get<IComment[]>(`/comments?post=${post}`);
    return response.data;
  },
);

export const addNewComment = createAsyncThunk<
  void,
  ICommentMutation,
  { state: RootState }
>("comments/addNewComment", async (comment, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.post(`/comments`, comment, {
    headers: { Authorization: token },
  });
});

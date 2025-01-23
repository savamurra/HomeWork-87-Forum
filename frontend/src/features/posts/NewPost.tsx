import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectLoading } from './postsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { PostMutation } from '../../types';
import { addNewPost, fetchPosts } from './postsThunk.ts';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import PostForm from './PostForm.tsx';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (post: PostMutation) => {
    try {
      await dispatch(addNewPost(post)).unwrap();
      toast.success("Post was successfully created!");
      await dispatch(fetchPosts());
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <PostForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewPost;
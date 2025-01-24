import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { PostMutation } from '../../../types';
import { addNewPost, fetchPosts } from '../postsThunk.ts';
import { toast } from 'react-toastify';
import PostForm from './PostForm.tsx';
import { selectUser } from '../../users/userSlice.ts';
import { useEffect } from 'react';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);


  const onSubmitForm = async (post: PostMutation) => {
    try {
      await dispatch(addNewPost(post)).unwrap();
      toast.success('Post was successfully created!');
      await dispatch(fetchPosts());
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <PostForm onSubmit={onSubmitForm}/>
    </>
  );
};

export default NewPost;

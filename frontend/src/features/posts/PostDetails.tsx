import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectError, selectLoading, selectPostDetails } from './postsSlice.ts';
import { useEffect } from 'react';
import { getPostById } from './postsThunk.ts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {apiUrl} from "../../globalConstants.ts";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postDetails = useAppSelector(selectPostDetails);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error" textAlign="center">Error loading post</Typography>;
  }

  if (!postDetails) {
    return <Typography variant="h6" color="textSecondary" textAlign="center">Post not found</Typography>;
  }

    const imageSrc = postDetails.image ? `${apiUrl}/${postDetails.image}` : "/text-image.jpg";

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mt: 4, textAlign: "center", fontWeight: 'bold' }}
      >
        Post details
      </Typography>
      <Card
        sx={{
          minWidth: 275,
          borderRadius: "10px",
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
          marginTop: 5,
          p: 2
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>{postDetails.title}</Typography>

          <CardMedia
            component="img"
            src={imageSrc}
            title={postDetails.title}
            sx={{
              borderRadius: "8px",
              width: "100px",
              height: "100px",
              mt: 2
            }}
          />

          <Typography variant="body1" mt={2}>{postDetails.description}</Typography>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Posted on {dayjs(postDetails.datetime).format('YYYY-MM-DD HH:mm:ss')} by {postDetails.user.username}
          </Typography>
          <hr/>
          <Typography variant="h6" sx={{color: "green"}}  mt={4}>Add comments</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default PostDetails;
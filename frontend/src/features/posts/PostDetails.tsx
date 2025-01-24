import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectError, selectLoading, selectPostDetails } from './postsSlice.ts';
import { useEffect } from 'react';
import { getPostById } from './postsThunk.ts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { apiUrl } from '../../globalConstants.ts';
import { selectComments, selectErrorComments, selectLoadingComments } from '../comments/commentsSlice.ts';
import { getCommentsByQuery } from '../comments/commentsThunk.ts';
import Comments from '../comments/Comments.tsx';
import NewComment from '../components/CommentsForm/NewComment.tsx';
import { selectUser } from '../users/userSlice.ts';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postDetails = useAppSelector(selectPostDetails);
  const isLoading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const comments = useAppSelector(selectComments);
  const isLoadingComments = useAppSelector(selectLoadingComments);
  const errorComments = useAppSelector(selectErrorComments);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);


  useEffect(() => {
    if (id) {
      dispatch(getPostById(id));
      dispatch(getCommentsByQuery(id))
    }
  }, [id, dispatch]);

  if (isLoading && isLoadingComments) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error && errorComments) {
    return <Typography variant="h6" color="error" textAlign="center">Error loading post and comments</Typography>;
  }

  if (!postDetails) {
    return <Typography variant="h6" color="textSecondary" textAlign="center">Post not found</Typography>;
  }

    const imageSrc = postDetails.image ? `${apiUrl}/${postDetails.image}` : "/text-image.jpg";

  return (
    <>
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
          <Typography
            variant="h5"
            sx={{
              mb:2,
              fontWeight: 'bold',
              color: "#041f4e",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
            }}
          >
            {postDetails.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Posted on {dayjs(postDetails.datetime).format('YYYY-MM-DD HH:mm:ss')} {" "}
            by {" "}
            <span
              style={{ color: 'green', fontWeight: 'bold' }}>
              {postDetails.user.username}
            </span>
          </Typography>
          <hr/>
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
          <Typography variant="body1" mt={2}> "{postDetails.description}" </Typography>
        </CardContent>
        <CardContent sx={{flexDirection: 'column'}}>
          <Typography
            variant="h6"
            sx={{
              mb:2,
              textAlign: "center",
              fontWeight: 'bold',
              color: "#041f4e",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
            }}
          >
            Comments:
          </Typography>
          {!comments ? (<Typography>Not found comments</Typography>) : (
            <>
              {comments.map((comment) => (
                <Comments key={comment._id} _id={comment._id} user={comment.user.username} text={comment.text}/>
              )).reverse()}
            </>
          )}
          {user ? (<NewComment _id={postDetails._id}/>) : null}
        </CardContent>
      </Card>
    </>
  );
};

export default PostDetails;
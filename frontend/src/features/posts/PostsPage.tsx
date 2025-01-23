import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import {fetchPosts} from "./postsThunk.ts";
import {selectError, selectLoading, selectPost} from "./postsSlice.ts";


const PostsPage = () => {
  const posts = useAppSelector(selectPost);
    const isLoading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography
                variant="h6"
                color="error"
                textAlign="center"
                sx={{ mt: 4 }}
            >
                Error loading posts
            </Typography>
        );
    }


    return (
      <>
        <Typography
          variant="h4"
          sx={{ mt: 4, textAlign: "center", fontWeight: 'bold' }}
        >
          Posts
        </Typography>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {posts.map((post) => {
            const imageSrc = post.image || "/text-image.jpg";

            return (
              <Grid size={12} key={post._id}>
                <Card
                  sx={{
                    minWidth: 300,
                    borderRadius: "10px",
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 5)',
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={imageSrc}
                      title={post.title}
                      sx={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        mr: 2,
                      }}
                    />
                    <div>
                      <Typography sx={{ fontSize: 16, fontWeight: "bold", color: 'grey' }}>
                        <span>{dayjs(post.datetime).format('YYYY-MM-DD HH:mm:ss')}</span>{" "}
                        by {post.user.username}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 15, fontWeight: "bold", flexGrow: 1 }}
                      >
                        {post.title}
                      </Typography>
                      <NavLink to={`/posts/${post._id}`}>Just chillin...</NavLink>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

      </>
  );
};

export default PostsPage;
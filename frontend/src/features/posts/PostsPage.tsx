import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, selectPost } from './postsSlice.ts';
import { useEffect } from 'react';
import dayjs from 'dayjs';


const PostsPage = () => {
  const posts = useAppSelector(selectPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


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
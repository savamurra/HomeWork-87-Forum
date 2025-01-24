import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import dayjs from "dayjs";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../postsThunk.ts";
import { selectError, selectLoading, selectPost } from "../postsSlice.ts";
import { apiUrl } from "../../../globalConstants.ts";

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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        Error loading posts. Please try again later!
      </Alert>
    );
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mt: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#041f4e",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Posts
      </Typography>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {posts.map((post) => {
          const imageSrc = post.image
            ? `${apiUrl}/${post.image}`
            : "/text-image.jpg";

          return (
            <Grid size={12} key={post._id}>
              <Card
                sx={{
                  minWidth: 300,
                  borderRadius: "20px",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    p: 2,
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
                      border: "3px solid grey",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                  <div>
                    <Typography
                      sx={{ fontSize: 16, fontWeight: "bold", color: "grey" }}
                    >
                      <span>
                        {dayjs(post.datetime).format("YYYY-MM-DD HH:mm:ss")}
                      </span>{" "}
                      by{" "}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {post.user.username}
                      </span>
                    </Typography>
                    <Typography
                      component={NavLink}
                      to={`/posts/${post._id}`}
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        flexGrow: 1,
                        color: "#2163f6",
                        "&:hover": {
                          color: "#3b82f6",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {post.title}...
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "grey",
                        mt: 1,
                      }}
                    >
                      Amount of comments:{" "}
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        {post.commentCount}
                      </span>
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

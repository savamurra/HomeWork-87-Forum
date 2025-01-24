import CssBaseline from "@mui/material/CssBaseline";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import PostsPage from "./features/posts/containers/PostsPage.tsx";
import PostDetails from "./features/posts/containers/PostDetails.tsx";
import NewPost from "./features/posts/components/NewPost.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="add-new-post" element={<NewPost />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;

import { Button } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

const AnonymousMenu = () => {
  return (
    <>
      <Button
        component={NavLink}
        to="/register"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          border: "1px solid #fff",
          borderRadius: "20px",
          textTransform: "none",
          margin: "0 8px",
          padding: "5px 20px",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: "white",
            color: "blue",
          },
        }}
      >
        Sign up
      </Button>
      <Button
        component={NavLink}
        to="/login"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          border: "1px solid #fff",
          borderRadius: "20px",
          textTransform: "none",
          margin: "0 8px",
          padding: "5px 20px",
          transition: "all 0.3s",
          "&:hover": {
            backgroundColor: "white",
            color: "blue",
          },
        }}
      >
        Sign in
      </Button>
    </>
  );
};

export default AnonymousMenu;

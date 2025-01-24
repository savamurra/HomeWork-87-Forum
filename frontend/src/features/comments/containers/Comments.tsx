import { Card, CardContent } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";

interface Props {
  _id: string;
  user: string;
  text: string;
}

const Comments: React.FC<Props> = ({ _id, user, text }) => {
  return (
    <>
      <Card
        key={_id}
        sx={{
          mb: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
              color: "grey",
              mb: 1,
            }}
          >
            Commented on{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>{user}:</span>
          </Typography>
          <Typography>"{text}"</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Comments;

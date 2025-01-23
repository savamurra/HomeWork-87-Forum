import { Card, CardContent } from '@mui/material';
import React from 'react';

interface Props {
  _id: string;
  user: string;
  text: string;
}

const Comments: React.FC<Props> = ({_id, user, text}) => {

  return (
    <Card key={_id} sx={{mb: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'}}>
      <CardContent sx={{fontSize: 14, fontWeight: "bold", color: 'grey'}}>Commented by {user}</CardContent>
      <CardContent>{text}</CardContent>
    </Card>
  );
};

export default Comments;
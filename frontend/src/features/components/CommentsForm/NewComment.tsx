import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ICommentMutation } from '../../../types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { addNewComment, getCommentsByQuery } from '../../comments/commentsThunk.ts';
import Typography from '@mui/material/Typography';
import { selectCreateLoading } from '../../comments/commentsSlice.ts';
import Spinner from '../../../components/UI/Spinner/Spinner.tsx';

interface Props {
  _id: string;
}

const initialState = {
  user: "",
  post: "",
  text: ""
};

const NewComment: React.FC<Props> = ({_id}) => {

  const [form, setForm] = useState<ICommentMutation>(initialState);
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateLoading);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, post: _id, [name]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.text.trim().length) {
      return (
        toast.error("Текст комментария обязателен!")
      )
    }
    await dispatch(addNewComment(form)).unwrap();
    await dispatch(getCommentsByQuery(_id));
    toast.success("Комментарий успешно добавлен!")
    setForm(initialState);
  };

  return (
    <> <Typography
      variant="h6"
      sx={{
        mb:2,
        textAlign: "center",
        fontWeight: 'bold',
        color: "#041f4e",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
      }}
    >
      Add new comments:
    </Typography>
      <Box
        component="form"
        sx={{ '& > :not(style)': { mt: 1, mb: 2 } }}
        noValidate
        autoComplete="off"
        onSubmit={submit}
      >
        <Grid container spacing={4} sx={{alignItems: 'center'}}>
          <Grid sx={{flexGrow: 1}} size={10}>
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              name="text"
              value={form.text}
              sx={{
                width:'100%'
              }}
              onChange={onChange}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #1E3A8A, #2563EB)",
              }}
              disabled={createLoading}
            >
              {createLoading ? <Spinner /> : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NewComment;
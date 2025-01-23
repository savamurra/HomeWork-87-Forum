import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ICommentMutation } from '../../../types';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/hooks.ts';
import { addNewComment, getCommentsByQuery } from '../../comments/commentsThunk.ts';

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
            sx={{width:'100%'}}
            onChange={onChange}
          />
        </Grid>
       <Grid>
         <Button
           type="submit"
           color="primary"
           variant="outlined"
         >
           Add
         </Button>
       </Grid>
      </Grid>
    </Box>
  );
};

export default NewComment;
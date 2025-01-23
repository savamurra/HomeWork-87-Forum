import React, { ChangeEvent, FormEvent, useState } from 'react';
import { PostMutation } from '../../types';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

interface Props {
  onSubmit: (product: PostMutation) => void;
}

const initialState = {
  title: "",
  description: "",
  image: null as File | null,
};

const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<PostMutation>(initialState);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();


    if (!form.title) {
      return (
        toast.error("Заголовок обязателен!")
      )
    }

    if (!form.description && !form.image) {
      return (
        toast.error("Добавьте либо описание, либо изображение!")
      )
    }

    onSubmit({ ...form });
    setForm(initialState);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mt: 4, textAlign: "center", fontWeight: 'bold' }}
      >Add new post</Typography>
      <form onSubmit={submitFormHandler}>
        <Grid
          container
          direction="column"
          spacing={3}
          sx={{maxWidth: 500, margin: "0 auto", mt: 4}}
        >
          <Grid>
            <TextField
              id="title"
              name="title"
              label="Title"
              value={form.title}
              onChange={inputChangeHandler}
              fullWidth
            />
          </Grid>

          <Grid>
            <TextField
              id="description"
              name="description"
              label="Description"
              value={form.description}
              onChange={inputChangeHandler}
              multiline
              rows={4}
              fullWidth
            />
          </Grid>

          <Grid>
            <FileInput
              name="image"
              label="Image"
              onGetFile={fileEventChangeHandler}
            />
          </Grid>

          <Grid>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PostForm;

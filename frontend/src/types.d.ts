export interface UserFields {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface IComment {
  _id: string;
  user: {username: string};
  post: string;
  text: string;
}

export interface ICommentMutation {
  user: string;
  post: string;
  text: string;
}

import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { unsetUser } from '../../../features/users/userSlice.ts';
import { logout } from '../../../features/users/userThunks.ts';
import { UserFields } from '../../../types';
import { NavLink } from 'react-router-dom';

interface Props {
  user: UserFields;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };
  return (
    <>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Button
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
        component={NavLink} to="/add-new-post" color="inherit">
        Add new post
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;

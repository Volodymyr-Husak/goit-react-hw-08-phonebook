import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import css from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const firstLetter = user.name.slice(0, 1);
  return (
    <div className={css.wrapper}>
      <p className={css.user_text}>Welcome, </p>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{firstLetter}</Avatar>
      <p className={css.user_name}>{user.name}</p>
      <Button
        type="button"
        onClick={() => dispatch(logOut())}
        sx={{ bgcolor: deepPurple[500] }}
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
};

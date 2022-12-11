import css from './ContactForm.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';

import { getContacts } from '../../redux/contacts/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export function ContactForm({ setModalOpen }) {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!data.get('name') || !data.get('number')) {
      return toast.warn('Please fill in all fields');
    }

    const form = e.currentTarget;
    let presenceContact = false;

    contacts.map(({ name }) => {
      if (name === form.name.value) {
        form.reset();
        presenceContact = true;
        return toast.warn(`${name} is already in contacts`);
      } else {
        return null;
      }
    });

    if (!presenceContact) {
      dispatch(
        addContact({
          name: data.get('name'),
          number: data.get('number'),
        })
      );
      form.reset();
      setModalOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton
            type="button"
            onClick={() => setModalOpen(false)}
            color="error"
            className={css.btn_close}
          >
            <CloseIcon />
          </IconButton>
          <Typography component="h1" variant="h5">
            Add the contact to your contact book
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              // autoComplete="name"
              // autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="number"
              label="Number"
              type="number"
              id="number"
              // autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add to contacts
            </Button>
          </Box>
        </Box>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          theme="dark"
        />
      </Container>
    </ThemeProvider>
  );
}

ContactForm.propTypes = {
  setModalOpen: propTypes.func.isRequired,
};

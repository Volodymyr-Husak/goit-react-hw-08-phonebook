import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ContactList } from 'components/Contacts/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { fetchContacts } from 'redux/contacts/operations';
import { getIsLoading } from 'redux/contacts/selectors';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const openModal = e => {
    e.preventDefault();
    setModalOpen(preState => !preState);
  };

  return (
    <>
      {!modalOpen && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          type="button"
          onClick={openModal}
          color="success"
          // position="center"
        >
          Add contact
        </Button>
      )}

      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      {modalOpen && <ContactForm setModalOpen={setModalOpen} />}
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      )}

      {!modalOpen && !isLoading && <ContactList />}
    </>
  );
}

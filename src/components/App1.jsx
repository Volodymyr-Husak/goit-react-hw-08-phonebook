import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIsLoading, getError } from 'redux/contacts/selectors';

import { fetchContacts } from 'redux/contacts/operations';

import { ContactForm } from './ContactForm/ContactForm';
import { Section } from './Section/Section';
import { ContactList } from './Contacts/ContactList';
import { ContactsCounter } from './ContactsCounter/ContactsCounter';
// import { AppBar } from './AppBar/AppBar';
export const App = () => {
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      {/* <AppBar /> */}
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <ContactsCounter />
      {isLoading && !error && <b>Request in progress...</b>}
      <Section title="Contacts">
        <ContactList />
      </Section>
    </div>
  );
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { TaskList } from 'components/TaskList/TaskList';
import { ContactList } from 'components/Contacts/ContactList';
// import { TaskEditor } from 'components/TaskEditor/TaskEditor';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsCounter } from 'components/ContactsCounter/ContactsCounter';
// import { fetchTasks } from 'redux/tasks/operations';
import { fetchContacts } from 'redux/contacts/operations';
// import { selectLoading } from 'redux/tasks/selectors';
import { getIsLoading } from 'redux/contacts/selectors';

export default function Contacts() {
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectLoading);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    // dispatch(fetchTasks());
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <ContactForm />
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactsCounter />
      <ContactList />
    </>
  );
}

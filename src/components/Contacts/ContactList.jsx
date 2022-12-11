import List from '@mui/material/List';

import { Contacts } from './Contacts';
import css from './Contacts.module.css';

import { setFilter } from '../../redux/contacts/filtersSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/contacts/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const contactsQuantity = contacts.length;

  const onChangeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div className={css.contacts__container}>
      <h2 className={css.contacts__title}>
        Your phone book (you have:{' '}
        <b className={css.contacts__quantity}>{contactsQuantity}</b> contacts)
      </h2>
      <label>
        <input
          className={css.contacts__input}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onChangeFilter}
          placeholder="Find contacts by name..."
        />
      </label>
      <List>
        <Contacts />
      </List>
    </div>
  );
};

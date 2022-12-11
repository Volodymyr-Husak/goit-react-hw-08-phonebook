import css from './Contacts.module.css';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/contacts/selectors';
import { getFilter } from '../../redux/contacts/selectors';

import { useDispatch } from 'react-redux';

import { deleteContact } from '../../redux/contacts/operations';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MdPhone from '@mui/icons-material/Phone';

const getVisibleContacts = (contacts, filter) => {
  if (filter.length === 0) {
    return contacts;
  }
  const contactsArr = contacts;

  const contactsFindArr = contactsArr.filter(({ name }) => {
    const nameContact = name.toLowerCase();
    const nameFilter = filter.toLowerCase();
    return nameContact.includes(nameFilter);
  });

  return contactsFindArr;
};

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDelete = e => {
    const currentId = e.currentTarget.id;
    dispatch(deleteContact(currentId));
  };

  const visibleContacts = getVisibleContacts(contacts, filter);

  return visibleContacts.map(({ name, number, id }) => (
    <ListItem
      key={id}
      className={css.contact_item}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleDelete}
          id={id}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <MdPhone color="info" />
        </Avatar>
      </ListItemAvatar>
      <span>
        {' '}
        {name}: {number}
      </span>
    </ListItem>
  ));
};

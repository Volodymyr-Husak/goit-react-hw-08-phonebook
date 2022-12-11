import { useAuth } from 'hooks';
import css from './Navigation.module.css';
import { LinkEl } from 'components/AuthNav/AuthNav.styled';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <LinkEl className={css.link} to="/">
        Home
      </LinkEl>
      {isLoggedIn && (
        <LinkEl className={css.link} to="/contacts">
          Contacts
        </LinkEl>
      )}
    </nav>
  );
};

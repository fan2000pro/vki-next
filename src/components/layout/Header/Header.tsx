import Link from 'next/link';
import Menu from '../Menu/Menu';
import styles from './Header.module.scss';
import type UserInterface from '@/types/UserInterface';
import Profile from './Profile/Profile';

interface Props {
  userFromServer?: UserInterface;
}

const Header = ({ userFromServer }: Props): React.ReactElement => (
  <header className={styles.Header}>
    <Link href="/" className={styles.title} role="heading">
      ВКИ Класс
    </Link>
    <Menu />
    <Profile userFromServer={userFromServer} />

  </header>
);

export default Header;
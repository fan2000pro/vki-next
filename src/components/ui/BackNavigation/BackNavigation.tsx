'use client';

import Link from 'next/link';
import styles from './BackNavigation.module.scss';

interface Props {
  href: string;
  text: string;
}

const BackNavigation = ({ href, text }: Props): React.ReactElement => (
  <div className={styles.BackNavigation}>
    <Link href={href}>{text}</Link>
  </div>
);

export default BackNavigation;


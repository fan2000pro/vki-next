'use client';

import Link from 'next/link';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  return (
    <div className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' } `}>
      <Link href={`/students/${student.id}`} className={styles.StudentLink}>
        <span>{`${student.id} - ${student.lastName} ${student.firstName} ${student.middleName}`}</span>
        {student.group && (
          <span className={styles.GroupName}>{student.group.name}</span>
        )}
      </Link>
      <button className={styles.DeleteButton} onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;

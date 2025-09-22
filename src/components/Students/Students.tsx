'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <h2 key={student.id}>
          {student.first_name}
          {student.last_name}
          {student.middle_name}
        </h2>
      ))}
    </div>
  );
};

export default Students;

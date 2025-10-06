'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import { deleteStudentDb } from '@/db/studentDb';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();

  const handleDeleteStudent = (studentId: number): void =>{
    deleteStudentMutate(studentId);
  };
  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={handleDeleteStudent}
        />
      ))}
    </div>
  );
};

export default Students;

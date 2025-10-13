'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent from './AddStudent/AddStudent';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();

  const handleDeleteStudent = (studentId: number): void =>{
    deleteStudentMutate(studentId);
  };
  const handleAddStudent = (values: { firstName: string; lastName: string; middleName: string }): void => {
    addStudentMutate({ ...values });
  };
  return (
    <div className={styles.Students}>
      <AddStudent onSubmit={handleAddStudent} />
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

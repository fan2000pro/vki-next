'use client';

import { useParams } from 'next/navigation';
import useStudent from '@/hooks/useStudent';
import BackNavigation from '@/components/ui/BackNavigation/BackNavigation';
import styles from './Student.module.scss';

const Student = (): React.ReactElement => {
  const params = useParams();
  const studentId = Number(params.id);
  const { student, isLoading } = useStudent(studentId);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!student) {
    return (
      <>
        <BackNavigation href="/students" text="<< список студентов" />
        <div>Студент не найден</div>
      </>
    );
  }

  return (
    <div className={styles.Student}>
      <BackNavigation href="/students" text="<< список студентов" />
      <h1>Студент</h1>
      <div className={styles.StudentInfo}>
        <div className={styles.StudentField}>
          <strong>ID:</strong> {student.id}
        </div>
        <div className={styles.StudentField}>
          <strong>Фамилия:</strong> {student.lastName}
        </div>
        <div className={styles.StudentField}>
          <strong>Имя:</strong> {student.firstName}
        </div>
        <div className={styles.StudentField}>
          <strong>Отчество:</strong> {student.middleName}
        </div>
        <div className={styles.StudentField}>
          <strong>Контакты:</strong> {student.contacts || 'Не указаны'}
        </div>
        {student.group && (
          <div className={styles.StudentField}>
            <strong>Группа:</strong> {student.group.name}
          </div>
        )}
        {!student.group && student.groupId && (
          <div className={styles.StudentField}>
            <strong>ID группы:</strong> {student.groupId}
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;


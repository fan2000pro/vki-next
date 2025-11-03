'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => (
        <div key={group.id} className={styles.Group}>
          <h2>{group.name}</h2>
          {group.students && group.students.length > 0 ? (
            <div className={styles.StudentsList}>
              <h3>Студенты:</h3>
              <ul>
                {group.students.map((student) => (
                  <li key={student.id}>
                    {student.lastName} {student.firstName} {student.middleName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Нет студентов в группе</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Groups;

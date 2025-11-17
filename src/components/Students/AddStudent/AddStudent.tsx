'use client';

import { useForm } from 'react-hook-form';
import useGroups from '@/hooks/useGroups';
import styles from './AddStudent.module.scss';

interface AddStudentFormValues {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId: number;
}

interface Props {
  onSubmit: (values: AddStudentFormValues) => void;
}

const AddStudent = ({ onSubmit }: Props): React.ReactElement => {
  const { groups } = useGroups();
  const defaultGroupId = groups.length > 0 ? groups[0].id : 0;
  
  const { register, handleSubmit, reset } = useForm<AddStudentFormValues>({
    defaultValues: { firstName: '', lastName: '', middleName: '', groupId: defaultGroupId },
  });

  const submitHandler = (values: AddStudentFormValues): void => {
    onSubmit(values);
    reset({ firstName: '', lastName: '', middleName: '', groupId: defaultGroupId });
  };

  return (
    <div className={styles.AddStudent}>
      <h3>Добавить нового студента</h3>
      <form className={styles.Form} onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.InputGroup}>
          <label htmlFor="lastName">Фамилия</label>
          <input 
            id="lastName"
            placeholder="Введите фамилию" 
            {...register('lastName', { required: true })} 
          />
        </div>
        <div className={styles.InputGroup}>
          <label htmlFor="firstName">Имя</label>
          <input 
            id="firstName"
            placeholder="Введите имя" 
            {...register('firstName', { required: true })} 
          />
        </div>
        <div className={styles.InputGroup}>
          <label htmlFor="middleName">Отчество</label>
          <input 
            id="middleName"
            placeholder="Введите отчество" 
            {...register('middleName', { required: true })} 
          />
        </div>
        <div className={styles.InputGroup}>
          <label htmlFor="groupId">Группа</label>
          {groups.length > 0 ? (
            <select id="groupId" {...register('groupId', { required: true })}>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          ) : (
            <select id="groupId" disabled>
              <option>Нет доступных групп</option>
            </select>
          )}
        </div>
        <button className={styles.Button} type="submit" disabled={groups.length === 0}>
          Добавить студента
        </button>
      </form>
    </div>
  );
};

export default AddStudent;



'use client';

import { useForm } from 'react-hook-form';
import useGroups from '@/hooks/useGroups';

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
    <form onSubmit={handleSubmit(submitHandler)}>
      <input placeholder="Фамилия" {...register('lastName', { required: true })} />
      <input placeholder="Имя" {...register('firstName', { required: true })} />
      <input placeholder="Отчество" {...register('middleName', { required: true })} />
      {groups.length > 0 ? (
        <select {...register('groupId', { required: true })}>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      ) : (
        <select disabled>
          <option>Нет доступных групп</option>
        </select>
      )}
      <button type="submit" disabled={groups.length === 0}>Добавить</button>
    </form>
  );
};

export default AddStudent;



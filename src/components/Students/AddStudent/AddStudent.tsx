'use client';

import { useForm } from 'react-hook-form';

interface AddStudentFormValues {
  firstName: string;
  lastName: string;
  middleName: string;
}

interface Props {
  onSubmit: (values: AddStudentFormValues) => void;
}

const AddStudent = ({ onSubmit }: Props): React.ReactElement => {
  const { register, handleSubmit, reset } = useForm<AddStudentFormValues>({
    defaultValues: { firstName: '', lastName: '', middleName: '' },
  });

  const submitHandler = (values: AddStudentFormValues): void => {
    onSubmit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input placeholder="Фамилия" {...register('lastName', { required: true })} />
      <input placeholder="Имя" {...register('firstName', { required: true })} />
      <input placeholder="Отчество" {...register('middleName', { required: true })} />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddStudent;



import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addStudentApi, deleteStudentApi, getStudentsApi, type AddStudentPayload } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';
import type GroupInterface from '@/types/GroupInterface';
import isServer from '@/utils/isServer';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  addStudentMutate: (payload: AddStudentPayload) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])] ;
      // сохраним текущие группы для возможного отката
      const previousGroups = queryClient.getQueryData<GroupInterface[]>(['groups']);

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      // Оптимистично убираем студента из соответствующей группы в кэше ['groups']
      if (previousGroups) {
        const updatedGroups = previousGroups.map((g) => ({
          ...g,
          students: (g.students ?? []).filter((s) => s.id !== studentId),
        }));
        queryClient.setQueryData<GroupInterface[]>(['groups'], updatedGroups);
      }

      console.log('deleteStudentMutate onMutate', previousStudents, updatedStudents);
      debugger;
      
      return { previousStudents, updatedStudents, previousGroups };
    },
    onError: (err, variables, context) => {
      console.log('deleteStudentMutate  err', err);
      debugger;
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
      if (context?.previousGroups) {
        queryClient.setQueryData<GroupInterface[]>(['groups'], context.previousGroups);
      }
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (studentId, variables, { previousStudents }) => {
      console.log('deleteStudentMutate onSuccess', studentId);
      debugger;

      await queryClient.cancelQueries({ queryKey: ['students'] });
      // вариант 1 - запрос всех записей
      // refetch();

      // вариант 2 - удаление конкретной записи
      if (!previousStudents) {
        return;
      }
      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      // Финально убираем студента из групп в кэше
      const groupsNow = queryClient.getQueryData<GroupInterface[]>(['groups']);
      if (groupsNow) {
        const updatedGroups = groupsNow.map((g) => ({
          ...g,
          students: (g.students ?? []).filter((s) => s.id !== studentId),
        }));
        queryClient.setQueryData<GroupInterface[]>(['groups'], updatedGroups);
      }
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

  /**
   * Мутация добавления студента
   */
  const addStudentMutate = useMutation({
    mutationFn: async (payload: AddStudentPayload) => addStudentApi(payload),
    onMutate: async (payload: AddStudentPayload) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      const groups = queryClient.getQueryData<GroupInterface[]>(['groups']) ?? [];
      const group = groups.find((g) => g.id === Number(payload.groupId));
      const optimisticId = Math.floor(Math.random() * 1_000_000) * -1; // отрицательный временный id
      const optimisticStudent: StudentInterface = {
        id: optimisticId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        middleName: payload.middleName,
        groupId: Number(payload.groupId ?? 0),
        contacts: '',
        ...(group ? { group: { id: group.id, name: group.name } } : {}),
      };
      const updatedStudents = [ ...(previousStudents ?? []), optimisticStudent ];
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      // Оптимистично обновляем список в группах
      const previousGroups = queryClient.getQueryData<GroupInterface[]>(['groups']);
      if (previousGroups) {
        const updatedGroups = previousGroups.map((g) => {
          if (g.id !== Number(payload.groupId)) return g;
          const groupStudents = g.students ?? [];
          return {
            ...g,
            students: [
              ...groupStudents,
              {
                id: optimisticId,
                firstName: payload.firstName,
                lastName: payload.lastName,
                middleName: payload.middleName,
                groupId: Number(payload.groupId ?? 0),
                contacts: '',
              },
            ],
          } as GroupInterface;
        });
        queryClient.setQueryData<GroupInterface[]>(['groups'], updatedGroups);
      }
      console.log('addStudentMutate onMuteate', previousStudents, updatedStudents);
      debugger;

      return { previousStudents, optimisticId, previousGroups };
    },
    onError: (err, variables, context) => {
      console.log('addStudentMutate err', err);
      debugger;
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
      if (context?.previousGroups) {
        queryClient.setQueryData<GroupInterface[]>(['groups'], context.previousGroups);
      }
    },
    onSuccess: async (student, variables, context) => {
      console.log('addStudentMutate onSuccess', student);
      debugger;

      await queryClient.cancelQueries({ queryKey: ['students'] });
      if (!student) {
        // если сервер не вернул данные, просто перезапросить список
        await refetch();
        return;
      }
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];
      const replaced = previousStudents.map((s) => s.id === context?.optimisticId ? student : s);
      queryClient.setQueryData<StudentInterface[]>(['students'], replaced);

      // Обновляем группу: заменяем оптимистичного студента реальным
      const groupsNow = queryClient.getQueryData<GroupInterface[]>(['groups']);
      if (groupsNow) {
        const updatedGroups = groupsNow.map((g) => {
          if (g.id !== Number(student.groupId)) return g;
          const groupStudents = g.students ?? [];
          const hasOptimistic = groupStudents.some((st) => st.id === context?.optimisticId);
          const newStudentForGroup = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            middleName: student.middleName,
            groupId: student.groupId,
            contacts: student.contacts,
          };
          return {
            ...g,
            students: hasOptimistic
              ? groupStudents.map((st) => (st.id === context?.optimisticId ? newStudentForGroup : st))
              : [...groupStudents, newStudentForGroup],
          } as GroupInterface;
        });
        queryClient.setQueryData<GroupInterface[]>(['groups'], updatedGroups);
      }
    },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    addStudentMutate: addStudentMutate.mutate,
  };
};

export default useStudents;

import { useQuery } from '@tanstack/react-query';
import { getStudentByIdApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentHookInterface {
  student: StudentInterface | null;
  isLoading: boolean;
}

const useStudent = (studentId: number): StudentHookInterface => {
  const { data, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentByIdApi(studentId),
    enabled: !!studentId && studentId > 0,
  });

  return {
    student: data ?? null,
    isLoading,
  };
};

export default useStudent;


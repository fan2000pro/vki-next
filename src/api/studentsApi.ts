import type StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as StudentInterface[];
  }
};

export const getStudentByIdApi = async (studentId: number): Promise<StudentInterface | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const student = await response.json() as StudentInterface;
    return student;
  }
  catch (err) {
    console.log('>>> getStudentByIdApi', err);
    return null;
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  console.log('deleteStudentApi', studentId);
  debugger;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    console.log('deleteStudentApi ok', studentId);
    debugger;

    return studentId;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return -1;
  }
};

export interface AddStudentPayload {
  firstName: string;
  lastName: string;
  middleName: string;
  groupId?: number;
}

export const addStudentApi = async (payload: AddStudentPayload): Promise<StudentInterface | null> => {
  console.log('addStudentApi', payload);
  debugger;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const student = await response.json() as StudentInterface;

    console.log('addStudentApi ok', payload);
    debugger;

    return student;
  }
   catch (err) {
     console.log('>>> addStudentApi', err);
     return null;
   }
};

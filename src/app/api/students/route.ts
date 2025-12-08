import { addStudentDb, getStudentsDb, getStudentByIdDb } from '@/db/studentDb';
import { dbInit } from '@/db/AppDataSource';

export async function GET(): Promise<Response> {
  await dbInit();
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: Request): Promise<Response> {
  // try {
    await dbInit();
    const body = await request.json();
    const { firstName, lastName, middleName, groupId } = body ?? {};

    if (!firstName || !lastName || !middleName) {
      return new Response(JSON.stringify({ message: 'firstName, lastName, middleName обязательны' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const student = await addStudentDb({
      firstName,
      lastName,
      middleName,
      groupId: Number(groupId ?? 1),
      contacts: '',
    });
    const studentWithGroup = await getStudentByIdDb(student.id);

    return new Response(JSON.stringify(studentWithGroup ?? student), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  // }
  // catch (e) {
  //   return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  // }
};

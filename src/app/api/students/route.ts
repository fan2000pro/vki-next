import { addStudentDb, getStudentsDb } from '@/db/studentDb';

export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(request: Request): Promise<Response> {
  // try {
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

    return new Response(JSON.stringify(student), {
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

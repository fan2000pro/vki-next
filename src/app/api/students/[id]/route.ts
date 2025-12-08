import { studentService } from '@/services/StudentService';
import { type NextRequest, NextResponse } from 'next/server';

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Params): Promise<Response> {
  const p = await params;
  const studentId = parseInt(p.id);
  const deletedStudentId = await studentService.deleteStudent(studentId);

  return new Response(JSON.stringify({ deletedStudentId }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    console.log('>>> API GET: Initializing database...');
    // await initializeDatabase();
    const { id } = await params;
    const studentId = parseInt(id, 10);
    console.log('>>> API GET: Getting student with ID:', studentId);

    const student = await studentService.getStudentById(studentId);

    if (!student) {
      console.log('>>> API GET: Student not found');
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 },
      );
    }

    console.log('>>> API GET: Successfully retrieved student:', studentId);
    // Преобразуем TypeORM entity в plain object для сериализации
    const plainStudent = JSON.parse(JSON.stringify(student));
    return NextResponse.json(plainStudent);
  }
  catch (error) {
    console.error('>>> API GET: Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 },
    );
  }
}
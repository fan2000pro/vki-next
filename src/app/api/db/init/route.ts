import { dbInit } from '@/db/AppDataSource';

export async function GET(): Promise<Response> {
  await dbInit();

  return new Response(JSON.stringify({ dbInit: 'done' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
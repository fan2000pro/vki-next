import { NextResponse } from 'next/server';

export async function POST(): Promise<Response> {
  try {
    // Создаем response с удалением cookies
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 },
    );

    // Очищаем оба токена из cookies
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // immediate expiration
    });

    return response;
  }
  catch (error) {
    console.error('Logout error:', error);

    // Даже при ошибке очищаем cookies на клиенте
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );

    response.cookies.set('accessToken', '', { maxAge: 0 });
    response.cookies.set('refreshToken', '', { maxAge: 0 });

    return response;
  }
}
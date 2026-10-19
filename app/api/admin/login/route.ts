import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const adminUsername = process.env.ADMIN_USERNAME || '';
    const adminPassword = process.env.ADMIN_PASSWORD || '';

    if (username === adminUsername && password === adminPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully',
      });

      // Set session cookie valid for 7 days
      response.cookies.set('admin_session', 'authenticated_user99_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Login failed' },
      { status: 500 }
    );
  }
}

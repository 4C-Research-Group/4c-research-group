import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    // First, check auth.users (contains authentication data)
    const { data: authUsers, error: authError } = await supabase
      .from('auth.users')
      .select('id, email, created_at, last_sign_in_at')
      .limit(10);

    if (authError) {
      console.error('Error fetching auth users:', authError);
    } else if (authUsers && authUsers.length > 0) {
      return NextResponse.json({
        source: 'auth.users',
        users: authUsers
      });
    }

    // If no users in auth.users, check public.users
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('*')
      .limit(10);

    if (publicError) {
      console.error('Error fetching public users:', publicError);
      return NextResponse.json(
        { 
          error: 'Error fetching users', 
          authError: authError?.message,
          publicError: publicError.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      source: 'public.users',
      users: publicUsers || []
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

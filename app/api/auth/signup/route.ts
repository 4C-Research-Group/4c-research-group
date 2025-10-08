import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    // 1. Sign up the user with email and password
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    }

    // 2. Create a corresponding user profile in the public.users table
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user?.id,
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      // Consider whether to delete the auth user if profile creation fails
      // await supabase.auth.admin.deleteUser(authData.user?.id);
      return NextResponse.json(
        {
          error: "User created but profile creation failed",
          details: profileError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User created successfully",
      user: authData.user,
      profile: profileData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

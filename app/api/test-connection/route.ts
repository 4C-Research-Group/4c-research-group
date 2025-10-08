// app/api/test-connection/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

  try {
    // Test auth endpoint
    const { data: authData, error: authError } =
      await supabase.auth.getSession();

    // Test users table access (using service key to bypass RLS if needed)
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    return NextResponse.json({
      auth: authError ? { error: authError.message } : { success: true },
      users: usersError
        ? { error: usersError.message }
        : { success: true, count: users?.length },
      config: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_KEY
          ? "Key exists"
          : "No key found",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        config: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          key: process.env.NEXT_PUBLIC_SUPABASE_KEY
            ? "Key exists"
            : "No key found",
        },
      },
      { status: 500 }
    );
  }
}

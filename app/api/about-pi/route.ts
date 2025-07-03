import { NextRequest, NextResponse } from "next/server";
import { getAboutPI, updateAboutPI } from "@/lib/supabase/about-pi";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  const data = await getAboutPI();
  if (!data) {
    return NextResponse.json(
      { error: "About PI data not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Create service role client for admin operations
    const supabaseAdmin = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const updates = await request.json();

    // Use service role client to update data (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from("about_pi")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .order("updated_at", { ascending: false })
      .limit(1)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating about PI:", error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "No data found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating about PI:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// Using any type for Database since we don't have the exact type definition
// In a production app, you should generate and use proper database types
// For example: npx supabase gen types typescript --project-id your-project-ref > lib/database.types.ts
type Database = any;

// Enable CORS for the API route
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  try {
    // Check for required environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing required Supabase environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500, headers: corsHeaders }
      );
    }
    
    const cookieStore = cookies();
    
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data, error } = await supabase
      .from("about_pi")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching about PI:", error);
      return NextResponse.json(
        { error: "About PI data not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/about-pi:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error("Failed to parse request body:", e);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400, headers: corsHeaders }
    );
  }

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

    // Verify user is authenticated and has admin role
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Update the about PI data
    const updates = body;

    // Use service role client to update data (bypasses RLS)
    // First, get the first row (there should only be one)
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from("about_pi")
      .select("id")
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching about PI:", fetchError);
      return NextResponse.json(
        { error: `Database error: ${fetchError.message}` },
        { status: 500, headers: corsHeaders }
      );
    }

    let data, error;

    if (existingData) {
      // Update existing row
      const { data: updateData, error: updateError } = await supabaseAdmin
        .from("about_pi")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", existingData.id)
        .select("*")
        .single();

      data = updateData;
      error = updateError;
    } else {
      // Insert new row if none exists
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from("about_pi")
        .insert({ ...updates, updated_at: new Date().toISOString() })
        .select("*")
        .single();

      data = insertData;
      error = insertError;
    }

    if (error) {
      console.error("Error updating about PI:", error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500, headers: corsHeaders }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "No data found to update" },
        { status: 404, headers: corsHeaders }
      );
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in PUT /api/about-pi:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Add this to handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

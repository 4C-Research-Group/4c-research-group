import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("🔍 Starting user role update for user ID:", params.id);

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
    console.log("🔍 Creating service role client...");
    console.log("🔍 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(
      "🔍 Service role key exists:",
      !!process.env.SUPABASE_SERVICE_ROLE_KEY
    );

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

    // Test service role client
    console.log("🔍 Testing service role client...");
    const { data: testData, error: testError } = await supabaseAdmin
      .from("users")
      .select("count")
      .limit(1);

    console.log("🔍 Service role test result:", testData);
    console.log("🔍 Service role test error:", testError);

    console.log("🔍 Verifying user authentication...");
    // Verify user is authenticated and has admin role
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("❌ Auth error:", authError);
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );
    }

    if (!user) {
      console.error("❌ No authenticated user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ User authenticated:", user.id);

    console.log("🔍 Checking admin role...");
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (roleError) {
      console.error("❌ Role check error:", roleError);
      return NextResponse.json(
        { error: "Failed to verify admin role" },
        { status: 500 }
      );
    }

    console.log("👤 User role:", userData?.role);

    if (userData?.role !== "admin") {
      console.error("❌ User is not admin");
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    console.log("✅ Admin access verified");

    // Parse request body
    const body = await request.json();
    console.log("📝 Request body:", body);

    const { role } = body;

    if (!role || !["admin", "user"].includes(role)) {
      console.error("❌ Invalid role:", role);
      return NextResponse.json(
        { error: "Invalid role - must be 'admin' or 'user'" },
        { status: 400 }
      );
    }

    console.log("🔍 Updating user role to:", role);

    // First, check if the target user exists in the users table
    console.log("🔍 Checking if user exists in public.users table...");
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("users")
      .select("id, email, role")
      .eq("id", params.id)
      .single();

    console.log("🔍 Check result - existingUser:", existingUser);
    console.log("🔍 Check result - checkError:", checkError);

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Error checking user existence:", checkError);
      return NextResponse.json(
        { error: `Failed to check user: ${checkError.message}` },
        { status: 500 }
      );
    }

    if (!existingUser) {
      console.log("⚠️ User not found in users table, creating user record...");

      // Get user info from auth.users
      console.log("🔍 Fetching user from auth.users...");
      const { data: authUser, error: authUserError } =
        await supabaseAdmin.auth.admin.getUserById(params.id);

      console.log("🔍 Auth user result:", authUser);
      console.log("🔍 Auth user error:", authUserError);

      if (authUserError || !authUser.user) {
        console.error("❌ Auth user not found:", authUserError);
        return NextResponse.json(
          {
            error: `User not found in authentication system. User ID: ${params.id}`,
          },
          { status: 404 }
        );
      }

      // Create user record in users table
      const { data: newUser, error: createError } = await supabaseAdmin
        .from("users")
        .insert({
          id: params.id,
          email: authUser.user.email,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) {
        console.error("❌ Error creating user record:", createError);
        return NextResponse.json(
          { error: `Failed to create user record: ${createError.message}` },
          { status: 500 }
        );
      }

      console.log("✅ User record created successfully:", newUser);
      return NextResponse.json({ success: true, user: newUser });
    }

    // User exists, update their role
    console.log(
      "✅ User exists, updating role from",
      existingUser.role,
      "to",
      role
    );

    // Try direct SQL update using service role client
    console.log("🔍 Attempting direct SQL update...");
    const { data: updateResult, error: updateError } = await supabaseAdmin.rpc(
      "update_user_role",
      {
        user_id: params.id,
        new_role: role,
      }
    );

    console.log("🔍 Direct SQL update result:", updateResult);
    console.log("🔍 Direct SQL update error:", updateError);

    if (updateError) {
      console.error("❌ Direct SQL update error:", updateError);

      // Fallback to regular update
      console.log("🔍 Falling back to regular update...");
      const { data: fallbackResult, error: fallbackError } = await supabaseAdmin
        .from("users")
        .update({
          role: role,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
        .select("id, role, updated_at");

      console.log("🔍 Fallback result:", fallbackResult);
      console.log("🔍 Fallback error:", fallbackError);

      if (fallbackError) {
        console.error("❌ Fallback update error:", fallbackError);
        return NextResponse.json(
          { error: `Failed to update user role: ${fallbackError.message}` },
          { status: 500 }
        );
      }

      if (!fallbackResult || fallbackResult.length === 0) {
        console.error("❌ No rows were updated in fallback");
        return NextResponse.json(
          {
            error:
              "No rows were updated - user may not exist or update was blocked",
          },
          { status: 500 }
        );
      }

      const updatedUser = fallbackResult[0];
      console.log("✅ User role updated successfully (fallback):", updatedUser);
      return NextResponse.json({ success: true, user: updatedUser });
    }

    // Fetch the updated user data
    const { data: updatedUser, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", params.id)
      .single();

    if (fetchError) {
      console.error("❌ Error fetching updated user:", fetchError);
      return NextResponse.json(
        { error: `Failed to fetch updated user: ${fetchError.message}` },
        { status: 500 }
      );
    }

    console.log("✅ User role updated successfully (direct SQL):", updatedUser);
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

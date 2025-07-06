import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const excludeId = searchParams.get("excludeId");
    const limit = parseInt(searchParams.get("limit") || "3");

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false })
      .limit(limit + 1); // Get one extra in case we need to exclude current post

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching related posts:", error);
      return NextResponse.json(
        { error: "Failed to fetch related posts" },
        { status: 500 }
      );
    }

    // Limit the results to the requested number
    const limitedData = data.slice(0, limit);

    return NextResponse.json(limitedData);
  } catch (error) {
    console.error("Error in related posts API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

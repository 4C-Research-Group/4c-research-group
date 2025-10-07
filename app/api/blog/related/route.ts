import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// This route needs to be dynamic because it handles search parameters
export const dynamic = 'force-dynamic';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const excludeId = searchParams.get("excludeId");
    const limit = parseInt(searchParams.get("limit") || "3");

    if (!category) {
      return new NextResponse(
        JSON.stringify({ error: "Category parameter is required" }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
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
      return new NextResponse(
        JSON.stringify({ error: "Failed to fetch related posts" }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // Limit the results to the requested number
    const limitedData = data.slice(0, limit);

    return new NextResponse(JSON.stringify(limitedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error("Error in related posts API:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
}

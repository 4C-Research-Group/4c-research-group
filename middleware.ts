import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/login", "/signup", "/auth/callback", "/"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client for middleware
  const supabase = createMiddlewareClient({ req: request, res: response });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    // If user is not authenticated and trying to access a protected route
    if (!user && !isPublicRoute) {
      console.log("🔒 Middleware: Redirecting unauthenticated user to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Only redirect authenticated users from login/signup pages, not from home page
    if (
      user &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/signup")
    ) {
      console.log(
        "🔄 Middleware: Redirecting authenticated user from login/signup"
      );
      // Check if user is admin to determine redirect path
      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      const redirectPath = userData?.role === "admin" ? "/admin" : "/dashboard";
      console.log("🔄 Middleware: Redirecting to:", redirectPath);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  } catch (error) {
    console.error("Middleware auth error:", error);
    // If there's an auth error, allow the request to continue
    // The page will handle authentication on its own
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/admin/:path*"],
};

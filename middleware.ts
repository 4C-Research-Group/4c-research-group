import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/research",
  "/team",
  "/publications",
  "/insights",
  "/knowledge-mobilization",
  "/research-4c",
  "/research-4c/cognition",
  "/research-4c/consciousness",
  "/research-4c/critical-care",
  "/4c-blogs",
  "/auth/callback",
];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

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

      // Add timeout for role checking to prevent delays
      const roleCheckPromise = supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Role check timeout")), 2000);
      });

      try {
        const result = (await Promise.race([
          roleCheckPromise,
          timeoutPromise,
        ])) as any;
        const userData = result?.data;
        const redirectPath =
          userData?.role === "admin" ? "/admin" : "/dashboard";
        console.log("🔄 Middleware: Redirecting to:", redirectPath);
        return NextResponse.redirect(new URL(redirectPath, request.url));
      } catch (error) {
        // If role check fails or times out, redirect to dashboard as default
        console.log(
          "⚠️ Middleware: Role check failed, redirecting to dashboard"
        );
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
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

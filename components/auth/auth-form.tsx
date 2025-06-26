"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface LoginFormData {
  email: string;
  password: string;
}

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  const hasAttemptedRedirect = useRef(false);
  const supabase = createClientComponentClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  // Check current session on component mount
  useEffect(() => {
    if (hasAttemptedRedirect.current) {
      console.log("🔄 Redirect already attempted, skipping session check");
      return;
    }

    let isMounted = true;

    const checkSession = async () => {
      try {
        console.log("🔍 Checking current session...");

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Session check timeout")), 5000);
        });

        const sessionPromise = supabase.auth.getUser();

        const result = await Promise.race([sessionPromise, timeoutPromise]);

        const {
          data: { user },
          error,
        } = result;

        if (!isMounted) return;

        if (error) {
          console.error("❌ Session check error:", error);
          setIsCheckingSession(false);
          return;
        }

        if (user) {
          console.log("✅ User already logged in:", user.id);

          // Check user role and redirect
          const { data: userData, error: roleError } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

          if (!isMounted) return;

          if (!roleError && userData) {
            console.log("👤 Current user role:", userData.role);
            const redirectPath =
              userData.role === "admin" ? "/admin" : "/dashboard";
            console.log("🚀 Redirecting to:", redirectPath);

            hasAttemptedRedirect.current = true;
            window.location.href = redirectPath;
            return;
          }
        }

        console.log("❌ No active session found");
        setIsCheckingSession(false);
      } catch (err) {
        if (!isMounted) return;
        console.error("❌ Session check failed:", err);
        setIsCheckingSession(false);
      }
    };

    checkSession();

    // Fallback timeout to ensure session check completes
    const fallbackTimeout = setTimeout(() => {
      if (isMounted && !hasAttemptedRedirect.current) {
        console.log("⏰ Session check fallback timeout - showing form");
        setIsCheckingSession(false);
      }
    }, 6000);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
    };
  }, []); // Empty dependency array

  const onSubmit = async (data: LoginFormData) => {
    // Prevent submission if already checking session
    if (isCheckingSession) {
      console.log("⏳ Session check in progress, preventing submission");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        console.log("🔐 Starting login process...");
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (error) {
          console.error("❌ Login error:", error);
          setError(error.message);
          return;
        }

        console.log("✅ Login successful, user ID:", authData.user?.id);

        if (authData.user) {
          // Refresh session to ensure server-side sync
          console.log("🔄 Refreshing session for server-side sync...");
          const { error: refreshError } = await supabase.auth.refreshSession();

          if (refreshError) {
            console.error("❌ Session refresh error:", refreshError);
          } else {
            console.log("✅ Session refreshed successfully");
          }

          // Wait for session to be properly established
          console.log("⏳ Waiting for session to be established...");
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Check if user is admin
          console.log("🔍 Checking user role...");
          const { data: userData, error: roleError } = await supabase
            .from("users")
            .select("role")
            .eq("id", authData.user.id)
            .single();

          if (roleError) {
            console.error("❌ Error checking user role:", roleError);
            setError("Error checking user permissions");
            return;
          }

          console.log("👤 User role:", userData?.role);

          // Redirect based on role
          if (userData?.role === "admin") {
            console.log("🚀 Redirecting admin to /admin");
            // Ensure session is established before redirect
            await supabase.auth.getSession();
            window.location.href = "/admin";
          } else {
            console.log("🚀 Redirecting user to /dashboard");
            await supabase.auth.getSession();
            window.location.href = "/dashboard";
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        setError("Check your email for a confirmation link!");
        reset();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome back" : "Create account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your details to create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCheckingSession ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Checking session...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    disabled={isLoading}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <Alert
                  variant={
                    error.includes("Check your email")
                      ? "default"
                      : "destructive"
                  }
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          )}

          {!isCheckingSession && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm text-blue-600 hover:text-blue-500"
                disabled={isLoading}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

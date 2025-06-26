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

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(initialMode === "login");
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
      return;
    }

    let isMounted = true;

    const checkSession = async () => {
      try {
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
          setIsCheckingSession(false);
          return;
        }

        if (user) {
          // Check user role and redirect
          const { data: userData, error: roleError } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single();

          if (!isMounted) return;

          if (!roleError && userData) {
            const redirectPath =
              userData.role === "admin" ? "/admin" : "/dashboard";

            hasAttemptedRedirect.current = true;
            window.location.href = redirectPath;
            return;
          }
        }

        setIsCheckingSession(false);
      } catch (err) {
        if (!isMounted) return;
        setIsCheckingSession(false);
      }
    };

    checkSession();

    // Fallback timeout to ensure session check completes
    const fallbackTimeout = setTimeout(() => {
      if (isMounted && !hasAttemptedRedirect.current) {
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
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (error) {
          setError(error.message);
          return;
        }

        if (authData.user) {
          // Check if user is admin immediately
          const { data: userData, error: roleError } = await supabase
            .from("users")
            .select("role")
            .eq("id", authData.user.id)
            .single();

          if (roleError) {
            setError("Error checking user permissions");
            return;
          }

          // Small delay to ensure session is established
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Redirect based on role immediately
          const redirectPath =
            userData?.role === "admin" ? "/admin" : "/dashboard";
          console.log(
            "🔄 Redirecting to:",
            redirectPath,
            "for user role:",
            userData?.role
          );
          window.location.href = redirectPath;
        }
      } else {
        const { data: signUpData, error } = await supabase.auth.signUp({
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

        if (signUpData.user) {
          // Manually create user record in users table
          console.log("Creating user record for:", signUpData.user.id);
          const { data: insertData, error: userError } = await supabase
            .from("users")
            .insert([
              {
                id: signUpData.user.id,
                email: signUpData.user.email,
                name: data.email.split("@")[0], // Use email prefix as name
                role: "user",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ])
            .select(); // Add select to get the inserted data

          if (userError) {
            console.error("Error creating user record:", userError);
            console.error("Error details:", userError.details);
            console.error("Error hint:", userError.hint);

            // Check if it's a duplicate key error (user already exists)
            if (userError.code === "23505") {
              console.log("User record already exists, continuing...");
            } else {
              // Only show error for non-duplicate key errors
              console.error("Non-duplicate error occurred:", userError);
            }
          } else {
            console.log("User record created successfully:", insertData);
          }
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

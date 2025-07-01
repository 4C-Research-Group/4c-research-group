"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
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
  confirmPassword?: string;
}

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  const hasAttemptedRedirect = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LoginFormData>();

  const password = watch("password");

  // Check current session on component mount
  useEffect(() => {
    if (hasAttemptedRedirect.current) {
      return;
    }

    let isMounted = true;

    const checkSession = async () => {
      try {
        // Reduce timeout to 2 seconds for faster response
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Session check timeout")), 2000);
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

    // Reduce fallback timeout to 3 seconds
    const fallbackTimeout = setTimeout(() => {
      if (isMounted && !hasAttemptedRedirect.current) {
        setIsCheckingSession(false);
      }
    }, 3000);

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

    // Frontend validation for confirm password
    if (!isLogin && data.password !== data.confirmPassword) {
      setError("Passwords do not match");
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

        // Redirect to home page after successful signup
        console.log("🔄 Redirecting to home page after signup");
        window.location.href = "/";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cognition-300/15 dark:bg-cognition-600/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-consciousness-300/15 dark:bg-consciousness-600/10 rounded-full animate-pulse-slow" />
        </div>

        {/* Auth Form */}
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Enter your details to create your account"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {isCheckingSession && (
                  <div className="flex items-center justify-center py-3 mb-4 bg-cognition-50 dark:bg-cognition-900/30 rounded-lg border border-cognition-200 dark:border-cognition-700">
                    <Loader2 className="h-4 w-4 animate-spin mr-2 text-cognition-600 dark:text-cognition-400" />
                    <span className="text-sm text-cognition-600 dark:text-cognition-400">
                      Checking session...
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
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
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
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

                {/* {isLogin && (
                  <div className="text-right mb-2">
                    <a
                      href="/forgot-password"
                      className="text-sm text-cognition-600 hover:text-cognition-800 dark:text-cognition-400 dark:hover:text-cognition-200 underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                )} */}

                {!isLogin && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                        disabled={isLoading}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                )}

                {error && (
                  <Alert
                    variant={
                      error.includes("Check your email")
                        ? "default"
                        : "destructive"
                    }
                    className="border-red-200 dark:border-red-800"
                  >
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cognition-600 to-consciousness-600 hover:from-cognition-700 hover:to-consciousness-700 text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-cognition-600 hover:text-cognition-700 dark:text-cognition-400 dark:hover:text-cognition-300 transition-colors"
                  disabled={isLoading}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>

              {/* Add OTP login button below the login form, only in login mode */}
              {isLogin && (
                <div className="mt-6 text-center">
                  <a
                    href="/login-otp"
                    className="inline-block text-cognition-600 hover:text-cognition-800 dark:text-cognition-400 dark:hover:text-cognition-200 underline font-medium"
                  >
                    Log in with a one-time code (OTP)
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

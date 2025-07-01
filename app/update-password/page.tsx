"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionRecovered, setSessionRecovered] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
    showForgotLink: boolean;
  } | null>(null);

  const router = useRouter();
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("Reset code from URL:", code);
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        console.log("exchangeCodeForSession result:", { data, error });
        if (error) {
          let friendlyMessage = error.message;
          let showForgotLink = false;
          if (
            friendlyMessage.includes(
              "both auth code and code verifier should be non-empty"
            )
          ) {
            friendlyMessage =
              "This password reset link cannot be used because your browser session is missing a security code. Please request a new password reset and be sure to click the link in the same browser and device where you requested it.";
            showForgotLink = true;
          }
          setMessage({
            type: "error",
            text: friendlyMessage + (showForgotLink ? "\n" : ""),
            showForgotLink,
          });
        } else {
          setSessionRecovered(true);
        }
      });
    } else {
      setMessage({
        type: "error",
        text: "No password reset code found in the URL.",
        showForgotLink: false,
      });
    }
  }, [searchParams, supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match",
        showForgotLink: false,
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
        showForgotLink: false,
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Password updated successfully! Redirecting to login...",
        showForgotLink: false,
      });

      await supabase.auth.signOut();

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password update error:", error);
      setMessage({
        type: "error",
        text:
          error.message ||
          "An error occurred while updating your password. Please try again.",
        showForgotLink: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
              Update Your Password
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Please enter your new password below
            </p>

            {!sessionRecovered && (
              <p className="text-sm text-center text-red-500 mb-4">
                Awaiting secure session... please make sure you clicked the
                password reset link from your email.
              </p>
            )}

            {message && (
              <div
                className={`rounded-md p-4 mb-4 ${message.type === "success" ? "bg-green-50" : "bg-red-50"}`}
              >
                <div
                  className={`text-sm ${message.type === "success" ? "text-green-800" : "text-red-800"}`}
                >
                  {message.text.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                  {message.showForgotLink && (
                    <div className="mt-2 text-center">
                      <a
                        href="/forgot-password"
                        className="text-cognition-600 hover:text-cognition-800 dark:text-cognition-400 dark:hover:text-cognition-200 underline"
                      >
                        Request a new password reset link
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm"
                  placeholder="Confirm New Password"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !sessionRecovered}
                className={`w-full mt-2 font-semibold py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ${
                  loading || !sessionRecovered
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-cognition-600 to-consciousness-600 hover:from-cognition-700 hover:to-consciousness-700 text-white"
                }`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

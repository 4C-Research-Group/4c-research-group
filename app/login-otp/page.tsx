"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setError(error.message);
    } else {
      setStep("otp");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });
    if (error) {
      setError(error.message);
    } else {
      setStep("success");
      setTimeout(() => router.push("/"), 1500);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cognition-300/15 dark:bg-cognition-600/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-consciousness-300/15 dark:bg-consciousness-600/10 rounded-full animate-pulse-slow" />
        </div>
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
              Login with OTP
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Enter your email to receive a one-time code.
            </p>
            {error && (
              <div className="mb-4 rounded bg-red-50 text-red-800 p-3 text-center">
                {error}
              </div>
            )}
            {step === "email" && (
              <form className="space-y-6" onSubmit={handleSendOtp}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-cognition-600 to-consciousness-600 hover:from-cognition-700 hover:to-consciousness-700 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}
            {step === "otp" && (
              <form className="space-y-6" onSubmit={handleVerifyOtp}>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enter the code sent to your email
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 placeholder-gray-400 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-cognition-600 to-consciousness-600 hover:from-cognition-700 hover:to-consciousness-700 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Log In"}
                </button>
              </form>
            )}
            {step === "success" && (
              <div className="text-center text-green-700 font-semibold py-6">
                Success! Logging you in...
              </div>
            )}
            <div className="mt-6 text-center">
              <a
                href="/login"
                className="text-sm text-cognition-600 hover:text-cognition-800 dark:text-cognition-400 dark:hover:text-cognition-200 underline"
              >
                Back to sign in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

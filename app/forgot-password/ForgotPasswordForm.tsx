"use client";
import { useFormState } from "react-dom";
import { handleResetPassword } from "./actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const initialState: { success?: boolean; error?: string } = {};

async function resetPasswordReducer(
  state: typeof initialState,
  formData: FormData
): Promise<typeof initialState> {
  const result = await handleResetPassword(formData);
  return result;
}

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(resetPasswordReducer, initialState);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
              Reset your password
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
            {/* Show message */}
            {state?.success && (
              <div className="mb-4 rounded bg-green-50 text-green-800 p-3 text-center">
                Password reset link sent! Please check your email.
              </div>
            )}
            {state?.error && (
              <div className="mb-4 rounded bg-red-50 text-red-800 p-3 text-center">
                {state.error}
              </div>
            )}
            <form className="space-y-6" action={formAction}>
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
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-cognition-600 to-consciousness-600 hover:from-cognition-700 hover:to-consciousness-700 text-white font-semibold py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send reset link
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-cognition-600 hover:text-cognition-800 dark:text-cognition-400 dark:hover:text-cognition-200 underline"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function BlogNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // TODO: Implement actual newsletter signup API
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setMessage(
        "Thank you for subscribing! Check your email for confirmation."
      );
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-cognition-50 to-consciousness-50 dark:from-cognition-900 dark:to-consciousness-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-cognition-600 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white text-2xl" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated with Our Research
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Get the latest insights, research updates, and breakthrough
              findings from the 4C Research Lab delivered directly to your
              inbox.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                    disabled={status === "loading"}
                  />
                  {status === "success" && (
                    <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                  )}
                  {status === "error" && (
                    <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-cognition-600 hover:bg-cognition-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 text-sm ${
                    status === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

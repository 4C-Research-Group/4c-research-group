"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";

export default function CriticalCarePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title="Critical Care Research"
        subtitle="Advancing the science of intensive care through innovative research"
      />

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We&apos;re working on bringing you comprehensive information about
              our critical care research initiatives. This page will feature our
              latest studies, clinical trials, and breakthroughs in intensive
              care medicine.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

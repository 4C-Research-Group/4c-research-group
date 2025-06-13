import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateString(
  value: unknown,
  maxLength: number
): value is string {
  if (!value || typeof value !== "string" || value.trim().length === 0) {
    return false;
  }
  return value.trim().length <= maxLength;
}

export const sectionStyles = {
  base: "container py-12 md:py-16 lg:py-24",
  card: "relative rounded-xl mx-auto flex flex-col items-center text-center lg:max-w-[1000px] overflow-hidden p-6 bg-white/30 dark:bg-gray-900/30 shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-lg",
  title: "text-2xl font-bold text-gray-900 dark:text-white",
  paragraph: "mt-4 text-gray-700 dark:text-gray-300 leading-relaxed",
};

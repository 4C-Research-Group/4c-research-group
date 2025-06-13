import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

// Option 1: Inter - Clean, modern, highly readable
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type Props = {};

export default function Header({}: Props) {
  return (
    <header
      className={`relative w-full h-[60vh] overflow-hidden ${inter.className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/header-background.jpg"
          alt="Header Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
          className="brightness-50 opacity-50"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-16 lg:px-24">
        <div className="header-content text-left">
          <h4 className="header-subtitle text-xl md:text-4xl mb-2 text-blue-700">
            Welcome to
          </h4>
          <h1 className="header-title text-4xl md:text-9xl font-bold text-gray-300 mb-4 drop-shadow-lg">
            Intelligent Data Science Lab
          </h1>
          <h6 className="header-mono text-lg md:text-xl mb-6 text-gray-400">
            Empowering the next generation of Cyber Physical Systems through the
            power of Data and AI
          </h6>
          <Link
            href="https://www.linkedin.com/in/idsl"
            target="_blank"
            className="btn btn-rounded bg-transparent border border-blue-400 inline-flex items-center justify-center px-6 py-3 text-blue-800 rounded-full hover:text-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            View LinkedIn
          </Link>
        </div>
      </div>
    </header>
  );
}

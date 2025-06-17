"use client";

import * as React from "react";
import Link from "next/link";
import {
  FaBrain,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import Image from "next/image";

export interface NavItem {
  name: string;
  href: string;
}

interface SiteFooterProps {
  navItems: NavItem[];
}

export function SiteFooter({ navItems }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                4C Research
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advancing research in cognition, consciousness, and critical care
              through innovative science and collaboration.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://x.com/Mission_FourC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cognition-600 dark:text-gray-400 dark:hover:text-cognition-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cognition-600 dark:text-gray-400 dark:hover:text-cognition-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cognition-600 dark:text-gray-400 dark:hover:text-cognition-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-cognition-600 dark:text-gray-400 dark:hover:text-cognition-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-cognition-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  800 Commissioners Rd E<br />
                  London, ON N6A 5W9
                  <br />
                  Canada
                </span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-cognition-500 mr-3" />
                <a
                  href="mailto:rishi.ganesan@lhsc.on.ca"
                  className="text-sm text-gray-600 hover:text-cognition-600 dark:text-gray-400 dark:hover:text-cognition-400 transition-colors"
                >
                  rishi.ganesan@lhsc.on.ca
                </a>
              </div>
              <div className="flex items-center">
                <FaPhone className="h-4 w-4 text-cognition-500 mr-3" />
                <a
                  href="tel:+15196858000"
                  className="text-sm text-gray-600 hover:text-cognition-600 dark:text-gray-400 dark:hover:text-cognition-400 transition-colors"
                >
                  +1 (519) 685-8500
                </a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest research updates and
              news.
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cognition-600 hover:bg-cognition-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500 dark:bg-cognition-700 dark:hover:bg-cognition-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} 4C Research Group. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

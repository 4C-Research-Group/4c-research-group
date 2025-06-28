"use client";

import { motion } from "framer-motion";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-care-50 to-white dark:from-care-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-care-900 dark:text-white mb-6">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our commitment to making 4C Research Lab accessible to everyone
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>Last updated:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Our Commitment to Accessibility
              </h2>
              <p className="mb-6">
                4C Research Lab is committed to ensuring digital accessibility
                for people with disabilities. We are continually improving the
                user experience for everyone and applying the relevant
                accessibility standards to ensure our website is accessible to
                all users.
              </p>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Conformance Status
              </h2>
              <p className="mb-4">
                The Web Content Accessibility Guidelines (WCAG) defines
                requirements for designers and developers to improve
                accessibility for people with disabilities. It defines three
                levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="mb-6">
                <strong>
                  4C Research Lab is partially conformant with WCAG 2.1 level
                  AA.
                </strong>
                Partially conformant means that some parts of the content do not
                fully conform to the accessibility standard.
              </p>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Accessibility Features
              </h2>
              <p className="mb-4">
                Our website includes the following accessibility features:
              </p>

              <h3 className="text-xl font-semibold mb-3">
                Visual Accessibility
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>High contrast color schemes and dark mode support</li>
                <li>
                  Resizable text that can be increased up to 200% without loss
                  of functionality
                </li>
                <li>
                  Clear typography with adequate line spacing and font sizes
                </li>
                <li>Consistent navigation and layout structure</li>
                <li>Proper heading hierarchy for screen readers</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                Keyboard Navigation
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Full keyboard navigation support</li>
                <li>Visible focus indicators for all interactive elements</li>
                <li>Logical tab order throughout the website</li>
                <li>Skip navigation links for main content</li>
                <li>Keyboard shortcuts for common actions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                Screen Reader Support
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  Semantic HTML structure for proper screen reader
                  interpretation
                </li>
                <li>Alternative text for all images and graphics</li>
                <li>Descriptive link text that explains the destination</li>
                <li>Proper ARIA labels and roles where necessary</li>
                <li>
                  Form labels and error messages that are screen reader
                  accessible
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                Multimedia Accessibility
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Captions and transcripts for video content</li>
                <li>Audio descriptions for visual content where appropriate</li>
                <li>Controls for multimedia playback</li>
                <li>Alternative formats for downloadable content</li>
              </ul>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Known Limitations
              </h2>
              <p className="mb-4">
                While we strive to ensure our website is fully accessible, we
                acknowledge that some areas may have limitations:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  Some older research documents may not be fully accessible
                </li>
                <li>
                  Third-party content and external links may not meet our
                  accessibility standards
                </li>
                <li>
                  Some interactive research tools may require additional
                  accessibility improvements
                </li>
                <li>
                  Complex data visualizations may need alternative text
                  descriptions
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Testing and Evaluation
              </h2>
              <p className="mb-4">
                We regularly test our website for accessibility using:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Automated accessibility testing tools</li>
                <li>
                  Manual testing with screen readers (NVDA, JAWS, VoiceOver)
                </li>
                <li>Keyboard-only navigation testing</li>
                <li>Color contrast analysis</li>
                <li>User testing with people who have disabilities</li>
              </ul>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Continuous Improvement
              </h2>
              <p className="mb-4">
                We are committed to continuously improving the accessibility of
                our website:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Regular accessibility audits and reviews</li>
                <li>Staff training on accessibility best practices</li>
                <li>
                  Incorporating accessibility into our development process
                </li>
                <li>
                  Staying updated with the latest accessibility standards and
                  guidelines
                </li>
                <li>
                  Addressing accessibility issues promptly when identified
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Alternative Access Methods
              </h2>
              <p className="mb-4">
                If you encounter accessibility barriers on our website, we offer
                alternative ways to access our content:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Email communication for research inquiries</li>
                <li>Phone consultations for research participation</li>
                <li>Alternative document formats upon request</li>
                <li>In-person meetings for research collaboration</li>
                <li>Assistive technology support and guidance</li>
              </ul>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Feedback and Contact Information
              </h2>
              <p className="mb-4">
                We welcome your feedback on the accessibility of our website. If
                you experience accessibility barriers or have suggestions for
                improvement, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <p>
                  <strong>Accessibility Coordinator</strong>
                </p>
                <p>Email: accessibility@4cresearchlab.com</p>
                <p>Phone: [Your Phone Number]</p>
                <p>TTY: [Your TTY Number]</p>
                <p>Address: [Your Address]</p>
              </div>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Technical Specifications
              </h2>
              <p className="mb-4">
                Accessibility of 4C Research Lab relies on the following
                technologies to work with the particular combination of web
                browser and any assistive technologies or plugins installed on
                your computer:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>HTML5</li>
                <li>WAI-ARIA</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                <li>
                  These technologies are relied upon for conformance with the
                  accessibility standards used.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-care-900 dark:text-white mb-4">
                Assessment Methods
              </h2>
              <p className="mb-4">
                The organization assessed the accessibility of 4C Research Lab
                by the following approaches:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Self-evaluation using automated testing tools</li>
                <li>External evaluation by accessibility consultants</li>
                <li>User testing with individuals who have disabilities</li>
                <li>Regular monitoring and feedback collection</li>
              </ul>

              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  <strong>Our Promise:</strong> 4C Research Lab is committed to
                  making our research accessible to everyone. We believe that
                  accessibility is not just a legal requirement, but a
                  fundamental aspect of inclusive research and education.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

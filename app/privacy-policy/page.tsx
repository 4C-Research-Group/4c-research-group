"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-cognition-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              How we collect, use, and protect your information at 4C Research
              Lab
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

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="mb-6">
                The 4C Research Lab (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website,
                participate in our research, or interact with our services.
              </p>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold mb-3">
                2.1 Personal Information
              </h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide
                to us, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Professional affiliation and credentials</li>
                <li>Research interests and participation preferences</li>
                <li>Comments, feedback, and communications with us</li>
                <li>Account credentials for our online platforms</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                2.2 Automatically Collected Information
              </h3>
              <p className="mb-4">
                When you visit our website, we automatically collect certain
                information, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>To provide and maintain our research services</li>
                <li>To communicate with you about research opportunities</li>
                <li>To improve our website and user experience</li>
                <li>To conduct research and analysis</li>
                <li>To comply with legal and regulatory requirements</li>
                <li>To protect against fraud and ensure security</li>
              </ul>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                4. Research Data and Ethics
              </h2>
              <p className="mb-4">
                As a research organization, we are committed to the highest
                ethical standards in data collection and use:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  All research involving human participants requires informed
                  consent
                </li>
                <li>Research data is anonymized whenever possible</li>
                <li>We follow institutional review board (IRB) guidelines</li>
                <li>
                  Research protocols are approved by relevant ethics committees
                </li>
                <li>
                  Data is stored securely and accessed only by authorized
                  personnel
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                5. Information Sharing and Disclosure
              </h2>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>
                  With research collaborators (with appropriate safeguards)
                </li>
                <li>With service providers who assist in our operations</li>
              </ul>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                6. Data Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures
                to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data storage and backup procedures</li>
                <li>Employee training on data protection</li>
              </ul>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to
                  another organization
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain processing
                  activities
                </li>
                <li>
                  <strong>Withdrawal:</strong> Withdraw consent for research
                  participation
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                8. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your
                experience on our website. You can control cookie settings
                through your browser preferences.
              </p>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                9. International Data Transfers
              </h2>
              <p className="mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place for such transfers.
              </p>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                10. Children&apos;s Privacy
              </h2>
              <p className="mb-4">
                Our website is not intended for children under 13. We do not
                knowingly collect personal information from children under 13
                without parental consent.
              </p>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the &quot;Last updated&quot;
                date.
              </p>

              <h2 className="text-2xl font-bold text-cognition-900 dark:text-white mb-4">
                12. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p>
                  <strong>4C Research Lab</strong>
                </p>
                <p>Email: rishi.ganesan@lhsc.on.ca</p>
                <p>Phone: +1 (519) 685-8500</p>
                <p>
                  Address: 800 Commissioners Rd E, London, ON N6A 5W9, Canada
                </p>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Note:</strong> This Privacy Policy is designed to
                  comply with GDPR, CCPA, and other applicable privacy laws. For
                  research-specific privacy information, please refer to
                  individual study consent forms and protocols.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

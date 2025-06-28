"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-consciousness-50 to-white dark:from-consciousness-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-consciousness-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The terms and conditions governing your use of 4C Research Lab
              services
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

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-6">
                By accessing and using the 4C Research Lab website and services
                (&quot;Services&quot;), you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to
                abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="mb-4">
                4C Research Lab provides research services, educational content,
                and collaborative opportunities in the fields of:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  <strong>Cognition:</strong> Cognitive research and brain
                  function studies
                </li>
                <li>
                  <strong>Consciousness:</strong> Consciousness research and
                  awareness studies
                </li>
                <li>
                  <strong>Critical Care:</strong> Critical care medicine and
                  patient outcomes
                </li>
                <li>
                  <strong>Care:</strong> Healthcare delivery and patient care
                  optimization
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                3. User Accounts and Registration
              </h2>
              <p className="mb-4">
                To access certain features of our Services, you may be required
                to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                4. Acceptable Use Policy
              </h2>
              <p className="mb-4">You agree not to use the Services to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our Services</li>
                <li>
                  Use automated systems to access our Services without
                  permission
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                5. Research Participation
              </h2>
              <p className="mb-4">
                When participating in our research studies, you acknowledge and
                agree to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide informed consent before participation</li>
                <li>Follow all study protocols and instructions</li>
                <li>Provide accurate and truthful information</li>
                <li>Respect the confidentiality of other participants</li>
                <li>
                  Understand that you may withdraw from studies at any time
                </li>
                <li>
                  Comply with all institutional review board (IRB) requirements
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                6. Intellectual Property Rights
              </h2>
              <h3 className="text-xl font-semibold mb-3">6.1 Our Content</h3>
              <p className="mb-4">
                All content on our website, including text, graphics, logos,
                images, and software, is the property of 4C Research Lab or its
                licensors and is protected by copyright and other intellectual
                property laws.
              </p>

              <h3 className="text-xl font-semibold mb-3">
                6.2 Research Publications
              </h3>
              <p className="mb-4">
                Research findings and publications may be subject to specific
                licensing agreements. Users must respect copyright notices and
                attribution requirements.
              </p>

              <h3 className="text-xl font-semibold mb-3">
                6.3 User-Generated Content
              </h3>
              <p className="mb-4">
                By submitting content to our Services, you grant us a
                non-exclusive, royalty-free license to use, reproduce, and
                distribute such content for research and educational purposes.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                7. Privacy and Data Protection
              </h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of
                personal information is governed by our Privacy Policy, which is
                incorporated into these Terms by reference.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                8. Disclaimers and Limitations
              </h2>
              <h3 className="text-xl font-semibold mb-3">
                8.1 Service Availability
              </h3>
              <p className="mb-4">
                We strive to maintain high availability of our Services but
                cannot guarantee uninterrupted access. We may temporarily
                suspend services for maintenance or updates.
              </p>

              <h3 className="text-xl font-semibold mb-3">
                8.2 Research Information
              </h3>
              <p className="mb-4">
                Research information provided on our website is for educational
                and informational purposes only. It should not be considered as
                medical advice or professional consultation.
              </p>

              <h3 className="text-xl font-semibold mb-3">
                8.3 Limitation of Liability
              </h3>
              <p className="mb-4">
                To the maximum extent permitted by law, 4C Research Lab shall
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising from your use of our
                Services.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                9. Indemnification
              </h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless 4C Research Lab, its
                officers, directors, employees, and agents from any claims,
                damages, or expenses arising from your use of the Services or
                violation of these Terms.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                10. Termination
              </h2>
              <p className="mb-4">
                We may terminate or suspend your access to our Services at any
                time, with or without cause, with or without notice. Upon
                termination, your right to use the Services will cease
                immediately.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                11. Governing Law and Jurisdiction
              </h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of [Your Jurisdiction]. Any disputes arising from
                these Terms shall be resolved in the courts of [Your
                Jurisdiction].
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                12. Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will
                notify users of material changes by posting the updated Terms on
                our website. Your continued use of the Services after such
                changes constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                13. Severability
              </h2>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable or
                invalid, that provision will be limited or eliminated to the
                minimum extent necessary so that these Terms will otherwise
                remain in full force and effect.
              </p>

              <h2 className="text-2xl font-bold text-consciousness-900 dark:text-white mb-4">
                14. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p>
                  <strong>4C Research Lab</strong>
                </p>
                <p>Email: legal@4cresearchlab.com</p>
                <p>Phone: [Your Phone Number]</p>
                <p>Address: [Your Address]</p>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Important:</strong> These Terms of Service constitute
                  a legally binding agreement. Please read them carefully before
                  using our Services. If you do not agree to these terms, please
                  do not use our Services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

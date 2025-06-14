"use client";

import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaUniversity,
  FaGraduationCap,
} from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    scholar?: string;
    website?: string;
  };
}

const teamMembers: Record<string, TeamMember[]> = {
  "Principal Investigators": [
    {
      name: "Dr. John Smith",
      role: "Director, 4C Research Lab",
      image: "/team/john-smith.jpg",
      bio: "Dr. Smith specializes in cognitive neuroscience with over 15 years of experience in critical care research. His work focuses on delirium prevention and cognitive recovery.",
      socials: {
        linkedin: "#",
        twitter: "#",
        scholar: "#",
        website: "#",
      },
    },
    {
      name: "Dr. Sarah Johnson",
      role: "Co-Director, 4C Research Lab",
      image: "/team/sarah-johnson.jpg",
      bio: "Dr. Johnson&apos;s research explores the intersection of critical care medicine and cognitive rehabilitation, with a focus on patient-centered outcomes.",
      socials: {
        linkedin: "#",
        scholar: "#",
      },
    },
  ],
  "Research Fellows": [
    {
      name: "Dr. Michael Chen",
      role: "Postdoctoral Fellow",
      image: "/team/michael-chen.jpg",
      bio: "Dr. Chen's research focuses on neuroimaging biomarkers for cognitive impairment in critical care survivors.",
      socials: {
        linkedin: "#",
        twitter: "#",
        scholar: "#",
      },
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Clinical Research Fellow",
      image: "/team/emily-rodriguez.jpg",
      bio: "Dr. Rodriguez investigates non-pharmacological interventions for delirium prevention in the ICU.",
      socials: {
        linkedin: "#",
        scholar: "#",
      },
    },
  ],
  "Graduate Students": [
    {
      name: "Alex Kim",
      role: "PhD Candidate",
      image: "/team/alex-kim.jpg",
      bio: "Alex's research examines the role of sleep in cognitive recovery following critical illness.",
      socials: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Priya Patel",
      role: "MSc Student",
      image: "/team/priya-patel.jpg",
      bio: "Priya studies the impact of family engagement on patient outcomes in the ICU.",
      socials: {
        linkedin: "#",
      },
    },
  ],
  "Research Staff": [
    {
      name: "David Wilson",
      role: "Research Coordinator",
      image: "/team/david-wilson.jpg",
      bio: "David manages the day-to-day operations of our clinical trials and research studies.",
      socials: {
        linkedin: "#",
      },
    },
    {
      name: "Maria Garcia",
      role: "Research Assistant",
      image: "/team/maria-garcia.jpg",
      bio: "Maria supports data collection and analysis across multiple research projects.",
      socials: {
        linkedin: "#",
      },
    },
  ],
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Team
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Meet the dedicated researchers and staff behind our groundbreaking
              work in critical care cognition.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {Object.entries(teamMembers).map(([team, members], teamIndex) => (
          <section key={team} className="mb-20">
            <motion.h2
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8 relative inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {team}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-cognition-500"></span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={`${member.name}-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cognition-100 to-cognition-300 dark:from-cognition-800 dark:to-cognition-900 opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaUniversity className="text-white text-6xl opacity-30" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-cognition-200 text-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {member.bio}
                    </p>
                    <div className="flex space-x-4">
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          className="text-gray-500 hover:text-cognition-500 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin className="text-xl" />
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a
                          href={member.socials.twitter}
                          className="text-gray-500 hover:text-cognition-500 transition-colors"
                          aria-label="Twitter"
                        >
                          <FaTwitter className="text-xl" />
                        </a>
                      )}
                      {member.socials?.scholar && (
                        <a
                          href={member.socials.scholar}
                          className="text-gray-500 hover:text-cognition-500 transition-colors"
                          aria-label="Google Scholar"
                        >
                          <FaGraduationCap className="text-xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* Join Our Team CTA */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            We're always looking for passionate researchers and students to join
            our team. Check our open positions or reach out to discuss potential
            opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/careers"
              className="px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border-2 border-cognition-600 text-cognition-600 dark:border-cognition-400 dark:text-cognition-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

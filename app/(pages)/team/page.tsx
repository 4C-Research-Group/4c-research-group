"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaEnvelope,
  FaGraduationCap,
  FaUserMd,
  FaQuoteLeft,
} from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  superpower: string;
  image?: string;
}
const principalInvestigator: TeamMember = {
  name: "Dr. Rishi Ganesan",
  role: "Head of the 4C Research Group",
  superpower:
    "Believing that something magical is happening within and around us every moment",
  image: "/team/team-1.jpg",
};

const teamMembers: TeamMember[] = [
  {
    name: "Maysaa Assaf",
    role: "Clinical Research Coordinator",
    superpower: "My smile!",
    image: "/team/team-2.jpg",
  },
  {
    name: "Karen Wong",
    role: "PhD Student",
    superpower: "I play on the Women's Football team at Western!",
    image: "/team/team-3.jpg",
  },
  {
    name: "Brian Krivoruk",
    role: "MSc Student",
    superpower: "Making music and DJing as a side job!",
    image: "/team/team-4.jpg",
  },
  {
    name: "Hiruthika Ravi",
    role: "MSc Student",
    superpower: "Intense puzzler (2000+ pieces especially!)",
    image: "/team/team-5.jpg",
  },
  {
    name: "Srinidhi Srinivasan",
    role: "Research Assistant",
    superpower: "I am a long-distance runner!",
    image: "/team/team-6.jpg",
  },
  {
    name: "Kyle Sun",
    role: "MSc Student",
    superpower: "",
    image: "/team/team-7.jpg",
  },
  {
    name: "Tallulah Nyland",
    role: "MSc Student",
    superpower: "",
    image: "/team/team-8.jpg",
  },
  {
    name: "Daniela Carvalho",
    role: "Research Assistant",
    superpower: "Major bookworm! (Guess my favourite genre)",
    image: "/team/team-9.jpg",
  },
  {
    name: "Sukhnoor Riar",
    role: "BSc Student in Biology and Medical Science",
    superpower: "Quoting Bollywood songs and movies!",
    image: "/team/team-10.jpg",
  },
  {
    name: "Sara Gehlaut",
    role: "BHSc student in Health Sciences and Biology",
    superpower: "Bollywood trivia!",
    image: "/team/team-11.jpg",
  },
];

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  bio: string;
  education: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Julia",
    role: "DDS Student",
    quote:
      "Working with Dr. Ganesan's lab during my clinical rotation has been a valuable experience that I am extremely grateful for. Being immersed in the realm of critical care over the span of 8 weeks allowed me to gain insight into how research is conducted at the bedside. It was evident that Dr. Ganesan, Maysaa, and the lab team strongly value mentorship, as they were always very supportive and available to provide my team and I with guidance on our research projects and in between observership sessions. I look forward to continue working on my research project with the 4C research group, and will carry forth my knowledge regarding pediatric care, and the environmental impact of anesthetics into my future career as a (hopefully pediatric) dentist!",
    bio: "Julia completed her BSc. (Honours) in Behaviour, Cognition, and Neuroscience at the University of Windsor, and her MSc. in Interdisciplinary Medical Sciences at Western University where she completed her clinical rotation under the supervision of Dr. Ganesan. In Fall 2024, she started her first year of the Doctor of Dental Surgery (DDS) program at the Schulich School of Medicine and Dentistry at Western University.",
    education:
      "BSc (Honours) in Behaviour, Cognition, and Neuroscience, University of Windsor; MSc in Interdisciplinary Medical Sciences, Western University; DDS Student at Schulich School of Medicine and Dentistry, Western University",
    image: "/team/team-12.jpg",
  },
  {
    name: "Devorah",
    role: "Research Assistant",
    quote:
      "I had the privilege of working under the supervision of Dr. Ganesan, alongside three classmates, as a component of my master's program at Western University. I was lucky to be welcomed so generously by Dr. Ganesan, Maysaa, and the graduate students in the lab. In the process of collaborating on various projects of the lab, with a focus on the Predict-ABI study, I learned about clinical research protocols as well as skills in applying fNIRS and EEG functional neuroimaging techniques. One of my favorite parts of the rotation was shadowing Dr. Ganesan in the PCCU during rounds! Dr. Ganesan is an excellent mentor. Their willingness to support me as a student and their investment in my success was what made the experience one-of-a-kind!",
    bio: "Devorah completed her undergraduate degree in cognitive and developmental neurosciences (BSc) at Western University, and a master's in interdisciplinary medical sciences (MSC) at Western University. Through her education, Devorah has gained several translational and technical skills that she hopes to apply in her future career in healthcare.",
    education:
      "BSc in Cognitive and Developmental Neurosciences, Western University; MSc in Interdisciplinary Medical Sciences, Western University",
    image: "/team/team-13.jpg",
  },
  {
    name: "Daniela",
    role: "Research Assistant",
    quote:
      "I had the pleasure of having Dr. Ganesan as my supervisor during my clinical-based rotation as a component of my MSc. in Interdisciplinary Medical Sciences. This opportunity was highly insightful and allowed me to gain exposure to various aspects of clinic research, such as consent and the REB application process. Dr. Ganesan, Maysaa, and all the other lab members were extremely welcoming to my group and I and were very helpful throughout the rotation as we navigated this new environment. I could not be more grateful to have been paired with Dr. Ganesan and look forward to what my future brings as a Research Assistant with the lab!",
    bio: "Daniela completed her Bachelor of Life Sciences (Honours) degree at McMaster University and went on to complete her MSc. In Interdisciplinary Medical Sciences at the University of Western Ontario. Through her master's program, she completed a clinical-based rotation, where she was able to gain shadowing and research experience. Daniela will now be continuing to pursue her research interests in Dr. Ganesan's lab as a Research Assistant.",
    education:
      "BSc (Honours) in Life Sciences, McMaster University; MSc in Interdisciplinary Medical Sciences, Western University",
    image: "/team/team-9.jpg",
  },
  {
    name: "Hafsa",
    role: "MSc Student",
    quote:
      "I had the privilege of completing my clinical research rotation under the supervision of Dr. Ganesan as part of my master's program. This experience has been extremely rewarding as I've gotten the opportunity to gain insight into clinical research and the vital role it plays in the PCCU. I was able to learn about the use of various functional neuroimaging tools and everything that goes into the implementation phase of a research project. Dr. Ganesan, Maysaa and all other lab members were a wonderful group to work with. I will always be grateful for their support and mentorship as I continue with my learning journey.",
    bio: "Hafsa completed her bachelor's in psychology, Neuroscience, and behaviour at McMaster University. She is currently completing her MSc. in Interdisciplinary Medical Sciences at the University of Western Ontario. Her research interests focus on neuroscience, child health and improving health outcomes in marginalized populations.",
    education:
      "BSc in Psychology, Neuroscience, and Behaviour, McMaster University; Current MSc Student in Interdisciplinary Medical Sciences, Western University",
  },
];

export default function TeamPage() {
  ``;
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
              Meet the talented individuals driving our research forward
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* PI Card - Full Width */}
          <div className="flex justify-center mb-16">
            <motion.div
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center pt-10 pb-8 px-8 text-center w-full max-w-2xl relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.3,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cognition-400 to-cognition-600"></div>
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300">
                {principalInvestigator.image ? (
                  <Image
                    src={principalInvestigator.image}
                    alt={principalInvestigator.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center text-5xl text-white font-bold">
                    {principalInvestigator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {principalInvestigator.name}
              </h3>
              <p className="text-cognition-600 dark:text-cognition-400 font-medium mb-4">
                {principalInvestigator.role}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Superpower
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {principalInvestigator.superpower}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Team Members Grid */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Our Team Members
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center pt-10 pb-8 px-6 text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cognition-400 to-cognition-600"></div>

                  {/* Profile image container */}
                  <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:border-cognition-400 transition-all duration-300 z-10">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                        <span className="text-5xl text-white font-bold">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-cognition-600 dark:text-cognition-400 font-medium text-lg mb-2">
                      {member.role}
                    </p>
                    {member.superpower && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                          My Superpower
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                          {member.superpower}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cognition-50/0 to-cognition-100/0 dark:from-cognition-900/0 dark:to-cognition-800/0 group-hover:from-cognition-50/30 group-hover:to-cognition-100/20 dark:group-hover:from-cognition-900/20 dark:group-hover:to-cognition-800/30 transition-all duration-500 -z-10"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Join Mission 4C
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We are always looking for passionate students to join our team. If
              you are interested in joining our team, please send your CV to:
            </p>
            <a
              href="mailto:rishi.ganesan@lhsc.on.ca"
              className="inline-flex items-center px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors mb-8"
            >
              <FaEnvelope className="mr-2" />
              rishi.ganesan@lhsc.on.ca
            </a>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Read more about previous students' experiences with Mission 4C
              below!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Student Testimonials
          </h2>
          <div className="space-y-12 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`testimonial-${index}`}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="md:flex">
                  {/* Left Column - Image */}
                  <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                          <span className="text-6xl text-white font-bold">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="md:w-2/3 p-8">
                    <div className="relative pl-4 border-l-4 border-cognition-400 mb-6">
                      <FaQuoteLeft className="absolute -left-3 -top-2 text-cognition-400 text-xl bg-white dark:bg-gray-800 p-1 rounded-full" />
                      <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-cognition-600 dark:text-cognition-400 font-medium mb-4">
                        {testimonial.role}
                      </p>

                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Bio
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {testimonial.bio}
                      </p>
                      <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                        <FaGraduationCap className="mt-0.5 mr-2 flex-shrink-0" />
                        <span>{testimonial.education}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  testimonial: string;
  bio: string;
  education: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Julia",
    role: "DDS Student",
    image: "/team/julia.jpg",
    testimonial:
      "Working with Dr. Ganesan's lab during my clinical rotation has been a valuable experience that I am extremely grateful for. Being immersed in the realm of critical care over the span of 8 weeks allowed me to gain insight into how research is conducted at the bedside. It was evident that Dr. Ganesan, Maysaa, and the lab team strongly value mentorship, as they were always very supportive and available to provide my team and I with guidance on our research projects and in between observership sessions. I look forward to continue working on my research project with the 4C research group, and will carry forth my knowledge regarding pediatric care, and the environmental impact of anesthetics into my future career as a (hopefully pediatric) dentist!",
    bio: "Julia completed her BSc. (Honours) in Behaviour, Cognition, and Neuroscience at the University of Windsor, and her MSc. in Interdisciplinary Medical Sciences at Western University where she completed her clinical rotation under the supervision of Dr. Ganesan. In Fall 2024, she started her first year of the Doctor of Dental Surgery (DDS) program at the Schulich School of Medicine and Dentistry at Western University.",
    education:
      "BSc (Honours) in Behaviour, Cognition, and Neuroscience, University of Windsor; MSc in Interdisciplinary Medical Sciences, Western University; DDS Student at Schulich School of Medicine and Dentistry, Western University",
  },
  {
    name: "Devorah",
    role: "Research Assistant",
    image: "/team/devorah.jpg",
    testimonial:
      "I had the privilege of working under the supervision of Dr. Ganesan, alongside three classmates, as a component of my master's program at Western University. I was lucky to be welcomed so generously by Dr. Ganesan, Maysaa, and the graduate students in the lab. In the process of collaborating on various projects of the lab, with a focus on the Predict-ABI study, I learned about clinical research protocols as well as skills in applying fNIRS and EEG functional neuroimaging techniques. One of my favorite parts of the rotation was shadowing Dr. Ganesan in the PCCU during rounds! Dr. Ganesan is an excellent mentor. Their willingness to support me as a student and their investment in my success was what made the experience one-of-a-kind!",
    bio: "Devorah completed her undergraduate degree in cognitive and developmental neurosciences (BSc) at Western University, and a master's in interdisciplinary medical sciences (MSC) at Western University.",
    education:
      "BSc in Cognitive and Developmental Neurosciences, Western University; MSc in Interdisciplinary Medical Sciences, Western University",
  },
  {
    name: "Daniela",
    role: "Research Assistant",
    image: "/team/daniela.jpg",
    testimonial:
      "I had the pleasure of having Dr. Ganesan as my supervisor during my clinical-based rotation as a component of my MSc. in Interdisciplinary Medical Sciences. This opportunity was highly insightful and allowed me to gain exposure to various aspects of clinic research, such as consent and the REB application process. Dr. Ganesan, Maysaa, and all the other lab members were extremely welcoming to my group and I and were very helpful throughout the rotation as we navigated this new environment. I could not be more grateful to have been paired with Dr. Ganesan and look forward to what my future brings as a Research Assistant with the lab!",
    bio: "Daniela completed her Bachelor of Life Sciences (Honours) degree at McMaster University and went on to complete her MSc. In Interdisciplinary Medical Sciences at the University of Western Ontario. Through her master's program, she completed a clinical-based rotation, where she was able to gain shadowing and research experience. Daniela will now be continuing to pursue her research interests in Dr. Ganesan's lab as a Research Assistant.",
    education:
      "BSc (Honours) in Life Sciences, McMaster University; MSc in Interdisciplinary Medical Sciences, Western University",
  },
  {
    name: "Hafsa",
    role: "MSc Student",
    image: "/team/hafsa.jpg",
    testimonial:
      "I had the privilege of completing my clinical research rotation under the supervision of Dr. Ganesan as part of my master's program. This experience has been extremely rewarding as I've gotten the opportunity to gain insight into clinical research and the vital role it plays in the PCCU. I was able to learn about the use of various functional neuroimaging tools and everything that goes into the implementation phase of a research project. Dr. Ganesan, Maysaa and all other lab members were a wonderful group to work with. I always be grateful for their support and mentorship as I continue with my learning journey.",
    bio: "Hafsa completed her bachelor's in psychology, Neuroscience, and behaviour at McMaster University. She is currently completing her MSc. in Interdisciplinary Medical Sciences at the University of Western Ontario. Her research interests focus on neuroscience, child health and improving health outcomes in marginalized populations.",
    education:
      "BSc in Psychology, Neuroscience, and Behaviour, McMaster University; Current MSc Student in Interdisciplinary Medical Sciences, Western University",
  },
];

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
              Testimonials
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Read about the experiences of our team members and their work in
              the Mission 4C lab.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/4">
                    <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gradient-to-br from-cognition-100 to-cognition-300 dark:from-cognition-800 dark:to-cognition-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl text-white opacity-30">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                      {member.name}
                    </h3>
                    <p className="text-cognition-600 dark:text-cognition-400 font-medium">
                      {member.role}
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {member.education}
                    </div>
                  </div>
                  <div className="w-full md:w-3/4 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Testimonial
                      </h4>
                      <blockquote className="text-gray-600 dark:text-gray-300 italic border-l-4 border-cognition-500 pl-4 py-1">
                        "{member.testimonial}"
                      </blockquote>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Bio
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Mission 4C */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 my-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Join Mission 4C
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center">
              We are always looking for passionate students to join our lab. If
              you are interested in joining the Mission 4C team, please send
              your CV to:
            </p>
            <div className="text-center mb-8">
              <a
                href="mailto:rishi.ganesan@lhsc.on.ca"
                className="inline-flex items-center px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors"
              >
                <FaEnvelope className="mr-2" />
                rishi.ganesan@lhsc.on.ca
              </a>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
              Read more about previous students' experiences with Mission 4C
              above!
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGraduationCap,
  FaHospital,
  FaFlask,
  FaAward,
  FaLinkedin,
} from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function AboutPIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cognition-600 to-cognition-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Dr. Rishi Ganesan
            </h1>
            <p className="text-xl md:text-2xl text-cognition-100">
              Physician-Scientist | Pediatric Critical Care | Neurocritical Care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-b from-cognition-500 to-cognition-700 p-8 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-200 shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/team/team-1.jpg"
                    alt="Dr. Rishi Ganesan"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Dr. Rishi Ganesan
                  </h2>
                  <p className="text-cognition-100 mb-4">MD, DM, MSc</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="text-white hover:text-cognition-200 transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="text-white hover:text-cognition-200 transition-colors"
                      aria-label="Google Scholar Profile"
                    >
                      <AiFillGoogleCircle className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="prose dark:prose-invert max-w-none"
                >
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-cognition-100 dark:bg-cognition-800 mr-3">
                        <FaHospital className="text-cognition-600 dark:text-cognition-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Current Positions
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-12">
                      Dr. Rishi Ganesan is a paediatric intensive care
                      physician-researcher with additional expertise in
                      paediatric neurocritical care. He is a physician in the
                      Division of Paediatric Critical Care Medicine at the
                      Children&apos;s Hospital- London Health Sciences Centre,
                      Assistant Professor in the Department of Paediatrics at
                      the Schulich School of Medicine (Western University) and
                      an Associate Scientist at the Lawson Health Research
                      Institute.
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-cognition-100 dark:bg-cognition-800 mr-3">
                        <FaGraduationCap className="text-cognition-600 dark:text-cognition-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Education & Training
                      </h3>
                    </div>
                    <ul className="space-y-3 pl-12 text-gray-700 dark:text-gray-300">
                      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-cognition-500">
                        <span className="font-medium">MD</span> - [Medical
                        School]
                      </li>
                      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-cognition-500">
                        <span className="font-medium">
                          DM (Doctorate of Medicine)
                        </span>{" "}
                        - [Specialization]
                      </li>
                      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-cognition-500">
                        <span className="font-medium">MSc</span> - [Field of
                        Study], [University]
                      </li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-cognition-100 dark:bg-cognition-800 mr-3">
                        <FaFlask className="text-cognition-600 dark:text-cognition-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Research Focus
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pl-12">
                      Dr. Ganesan is also an accomplished clinical researcher.
                      With 19 peer-reviewed original publications in high-impact
                      journals including three randomized controlled trials, his
                      research works have been cited more than 180 times. He has
                      also been invited to speak and present his research at
                      several national and international conferences. Dr.
                      Ganesan is presently enrolled in a Master's program (MSc)
                      in neurosciences at the Institute of Medical Sciences of
                      the University of Toronto (2017-20).
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 pl-12">
                      Dr. Ganesan's research program aims to improve the
                      long-term cognitive and functional outcomes in critically
                      ill children through the development, validation and
                      implementation of electroencephalography-based monitoring
                      tools that provide real-time information regarding brain
                      states. This program would enable bedside critical care
                      providers to identify evolving brain pathologies quickly,
                      deliver neuroprotective or neurorestorative interventions
                      in a timely manner and determine prognosis objectively in
                      high-risk critically ill children. This inter-disciplinary
                      research program sits at the intersection of signal
                      processing, electroencephalography and artificial
                      intelligence.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-cognition-100 dark:bg-cognition-800 mr-3">
                        <FaAward className="text-cognition-600 dark:text-cognition-300" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Awards & Honors
                      </h3>
                    </div>
                    <ul className="space-y-2 pl-12 text-gray-700 dark:text-gray-300">
                      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-cognition-500">
                        Dr. Ganesan has an exemplary academic track record.
                        During his medical training (2004-09) at Jawaharlal
                        Institute of Postgraduate Medical Education & Research
                        (JIPMER, India), he received more than 20 endowment
                        awards for his clinical-research excellence and
                        graduated as the best outgoing graduate, the best intern
                        and the valedictorian of his class.
                      </li>
                      <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-cognition-500">
                        He won the institute bronze medal for the best outgoing
                        paediatric resident and was the seventh in India to
                        complete the clinical doctorate program (D.M.) in
                        paediatric critical care.
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

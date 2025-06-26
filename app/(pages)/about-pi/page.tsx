"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPIPage() {
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
              About the PI
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Dr. Rishi Ganesan, MD, DM, MSc
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100 dark:bg-gray-700 p-6 flex items-center justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-600">
                {/* Placeholder for PI's photo - replace with actual image */}
                <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                  <span className="text-6xl text-white font-bold">RG</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <motion.div
                className="prose dark:prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mb-4">
                  Dr. Rishi Ganesan is a paediatric intensive care
                  physician-researcher with additional expertise in paediatric
                  neurocritical care. He is a physician in the Division of
                  Paediatric Critical Care Medicine at the Children's Hospital-
                  London Health Sciences Centre, Assistant Professor in the
                  Department of Paediatrics at the Schulich School of Medicine
                  (Western University) and an Associate Scientist at the Lawson
                  Health Research Institute.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
                  Education & Training
                </h3>
                <p className="mb-4">
                  Dr. Ganesan has an exemplary academic track record. During his
                  medical training (2004-09) at Jawaharlal Institute of
                  Postgraduate Medical Education & Research (JIPMER, India), he
                  received more than 20 endowment awards for his
                  clinical-research excellence and graduated as the best
                  outgoing graduate, the best intern and the valedictorian of
                  his class. He completed his pediatric residency (2010-12) and
                  fellowship in pediatric critical care (2013-16) from the Post
                  Graduate Institute of Medical Education & Research (PGIMER,
                  India), one of Asia's largest multi-specialty academic
                  children's hospitals. He won the institute bronze medal for
                  the best outgoing paediatric resident and was the seventh in
                  India to complete the clinical doctorate program (D.M.) in
                  paediatric critical care.
                </p>
                <p className="mb-4">
                  Subsequently, he moved to Toronto to pursue a unique,
                  interdisciplinary one-year clinical fellowship in Pediatric
                  neurocritical care at SickKids (2016-17). Thereafter, he
                  worked there as a clinical-research fellow supported by the
                  RESTRACOMP and C-BMH integrative research awards (2017-18).
                  Prior to joining the department here in London, he had been
                  working as an Assistant Staff Physician in the Department of
                  Critical Care Medicine at SickKids, Toronto (2018-19).
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
                  Research Focus
                </h3>
                <p className="mb-4">
                  Dr. Ganesan is also an accomplished clinical researcher. With
                  19 peer-reviewed original publications in high-impact journals
                  including three randomized controlled trials, his research
                  works have been cited more than 180 times. He has also been
                  invited to speak and present his research at several national
                  and international conferences. Dr. Ganesan is presently
                  enrolled in a Master's program (MSc) in neurosciences at the
                  Institute of Medical Sciences of the University of Toronto
                  (2017-20).
                </p>
                <p>
                  Dr. Ganesan's research program aims to improve the long-term
                  cognitive and functional outcomes in critically ill children
                  through the development, validation and implementation of
                  electroencephalography-based monitoring tools that provide
                  real-time information regarding brain states. This program
                  would enable bedside critical care providers to identify
                  evolving brain pathologies quickly, deliver neuroprotective or
                  neurorestorative interventions in a timely manner and
                  determine prognosis objectively in high-risk critically ill
                  children. This inter-disciplinary research program sits at the
                  intersection of signal processing, electroencephalography and
                  artificial intelligence.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

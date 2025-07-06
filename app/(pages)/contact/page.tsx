"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import type { ContactPage } from "@/lib/types/contact-page";
import PageHero from "@/components/PageHero";

type Props = {};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const DEFAULT_CONTACT: ContactPage = {
  id: "",
  address: "800 Commissioners Rd E\nLondon, ON N6A 5W9",
  phone: "(519) 685-8500 Ext. 74702",
  email: "rishi.ganesan@lhsc.on.ca",
  research_coordinator_name: "Ms. Maysaa Assaf",
  research_coordinator_email: "Maysaa.Assaf@lhsc.on.ca",
  hours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday - Sunday: Closed",
  hero_title: "Get In Touch",
  hero_description:
    "Let us know if you are interested in learning more about our research, collaborating with our team, or contributing to our mission. If you are a student looking for opportunities to participate in research, please do not hesitate to reach out!",
  map_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5979841.431727101!2d-90.98107327499999!3d42.960482299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef0fa90d42453%3A0x1e8dae5de3acaae!2sVictoria%20Hospital%20%26%20Children's%20Hospital!5e0!3m2!1sen!2sca!4v1751160990375!5m2!1sen!2sca",
  updated_at: "",
};

export default function ContactPage({}: Props) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [contact, setContact] = useState<ContactPage>(DEFAULT_CONTACT);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        });
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetch("/api/contact/page")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setContact(data))
      .catch(() => setContact(DEFAULT_CONTACT));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title={contact.hero_title}
        subtitle={contact.hero_description}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <FaCheck className="mr-2 flex-shrink-0" />
                ) : (
                  <FaExclamationTriangle className="mr-2 flex-shrink-0" />
                )}
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                    placeholder="John"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                    placeholder="Doe"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                  placeholder="How can we help?"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                  placeholder="Your message here..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cognition-600 hover:bg-cognition-700 disabled:bg-cognition-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-cognition-100 dark:bg-cognition-900 p-3 rounded-full text-cognition-600 dark:text-cognition-400">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Location
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-cognition-100 dark:bg-cognition-900 p-3 rounded-full text-cognition-600 dark:text-cognition-400">
                    <FaPhone className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Phone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-cognition-100 dark:bg-cognition-900 p-3 rounded-full text-cognition-600 dark:text-cognition-400">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors"
                      >
                        {contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-cognition-100 dark:bg-cognition-900 p-3 rounded-full text-cognition-600 dark:text-cognition-400">
                    <FaUser className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Research Coordinator
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {contact.research_coordinator_name}
                      <br />
                      <a
                        href={`mailto:${contact.research_coordinator_email}`}
                        className="hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors"
                      >
                        {contact.research_coordinator_email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-cognition-100 dark:bg-cognition-900 p-3 rounded-full text-cognition-600 dark:text-cognition-400">
                    <FaClock className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="w-full h-64">
                <iframe
                  src={contact.map_embed_url}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Victoria Hospital & Children's Hospital"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/NHAV4ZiR9p3aeGGW6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 px-4 py-2 bg-cognition-600 hover:bg-cognition-700 text-white font-semibold rounded-lg transition-colors"
            >
              Open in Google Maps
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, HelpCircle, Briefcase, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const contactReasons = [
  { value: "general", label: "General Inquiry", icon: MessageSquare },
  { value: "support", label: "Technical Support", icon: HelpCircle },
  { value: "enterprise", label: "Enterprise Sales", icon: Briefcase },
  { value: "partnership", label: "Partnership", icon: Users },
  { value: "feedback", label: "Feedback", icon: Heart },
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@reepost.ai",
    href: "mailto:hello@reepost.ai",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "San Francisco, CA",
    href: "#",
  },
];

import { Users, Heart } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        company: "",
        reason: "general",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-6">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Get in Touch
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              We'd love to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                hear from you
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Have a question, feedback, or need help? Our team is here to assist
              you. We typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all hover:shadow-lg text-center group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{info.title}</h3>
                <p className="text-text-secondary">{info.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Acme Inc."
                />
              </div>

              {/* Reason */}
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  What can we help you with? *
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {contactReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-sm text-text-secondary text-center">
                We'll get back to you within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Hint */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-light-green/50 to-white rounded-3xl p-12"
        >
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Looking for quick answers?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Check out our FAQ page for instant answers to common questions
          </p>
          <a
            href="/#faq"
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all hover:scale-105"
          >
            Visit FAQ
          </a>
        </motion.div>
      </section>
    </div>
  );
}

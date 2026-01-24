"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HelpCircle,
  Book,
  MessageSquare,
  Mail,
  Video,
  FileText,
  Search,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const supportChannels = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 for Pro & Enterprise",
    action: "Start Chat",
    href: "#",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24 hours",
    action: "Send Email",
    href: "/contact",
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Browse our comprehensive guides",
    availability: "Always available",
    action: "View Docs",
    href: "/docs",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Learn through step-by-step videos",
    availability: "Always available",
    action: "Watch Videos",
    href: "#tutorials",
  },
];

const commonIssues = [
  {
    question: "How do I connect my LinkedIn account?",
    answer:
      "Go to Settings > LinkedIn Connection and click 'Connect LinkedIn'. You'll be redirected to LinkedIn to authorize Repost AI. We use OAuth 2.0, so we never see your password.",
    category: "Getting Started",
  },
  {
    question: "Why isn't my post publishing to LinkedIn?",
    answer:
      "Check: 1) LinkedIn connection is active in Settings, 2) Post is scheduled (not draft), 3) Your LinkedIn account has posting permissions. If issues persist, try reconnecting LinkedIn.",
    category: "Publishing",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Go to Settings > Billing > Cancel Subscription. Your access continues until the end of your billing period. No refunds for partial months.",
    category: "Billing",
  },
  {
    question: "Can I schedule posts for multiple LinkedIn accounts?",
    answer:
      "Yes! Free plan supports 1 account, Starter supports 3, Pro supports unlimited. Add accounts in Settings > LinkedIn Accounts.",
    category: "Features",
  },
  {
    question: "How does the AI content generation work?",
    answer:
      "We use advanced AI (GPT-4) combined with analysis of viral LinkedIn posts. Our RAG (Retrieval-Augmented Generation) system finds similar successful posts and generates content following proven patterns.",
    category: "AI Features",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes! We use bank-level encryption (SSL/TLS), OAuth 2.0 authentication, and never store your LinkedIn password. We're GDPR and CCPA compliant. See our Security page for details.",
    category: "Security",
  },
];

const quickLinks = [
  { title: "Getting Started Guide", href: "/docs/getting-started" },
  { title: "LinkedIn Connection", href: "/docs/linkedin-setup" },
  { title: "Content Generation", href: "/docs/ai-generation" },
  { title: "Scheduling Posts", href: "/docs/scheduling" },
  { title: "Analytics Dashboard", href: "/docs/analytics" },
  { title: "API Documentation", href: "/api" },
  { title: "Troubleshooting", href: "/docs/troubleshooting" },
  { title: "Billing & Subscriptions", href: "/docs/billing" },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(commonIssues.map((issue) => issue.category))),
  ];

  const filteredIssues = commonIssues.filter((issue) => {
    const matchesSearch =
      issue.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || issue.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Support Center
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              How can we{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                help you
              </span>
              ?
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              Get quick answers, browse documentation, or reach out to our support
              team
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Get Support
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <channel.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {channel.title}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {channel.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
                  <Clock className="w-4 h-4" />
                  {channel.availability}
                </div>
                <Link
                  href={channel.href}
                  className="block text-center w-full bg-gradient-to-r from-primary to-accent text-white py-2 rounded-lg font-medium hover:shadow-md transition-all"
                >
                  {channel.action}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-light-green/30 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Common Issues & Solutions
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-white dark:bg-gray-800 text-text-secondary hover:text-text-primary border border-gray-200 dark:border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredIssues.map((issue, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 group"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary group-open:text-primary">
                        {issue.question}
                      </h3>
                      <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {issue.category}
                      </span>
                    </div>
                  </div>
                </summary>
                <div className="mt-4 pl-9 text-text-secondary leading-relaxed">
                  {issue.answer}
                </div>
              </motion.details>
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">
                No results found. Try different keywords or{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  contact our support team
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Helpful Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="block bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all hover:shadow-md group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-text-primary group-hover:text-primary">
                      {link.title}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-accent rounded-3xl p-12 text-white"
        >
          <h2 className="text-4xl font-bold mb-6">Still need help?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is available 24/7 to assist you with any questions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            Contact Support
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

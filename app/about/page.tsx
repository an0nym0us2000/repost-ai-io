"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Users, Zap, Heart, TrendingUp, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We're on a mission to democratize professional content creation and help everyone build a powerful LinkedIn presence.",
  },
  {
    icon: Users,
    title: "User-Centric",
    description:
      "Every feature we build starts with listening to our users. Your success is our success.",
  },
  {
    icon: Zap,
    title: "Innovation First",
    description:
      "We leverage cutting-edge AI technology to stay ahead and deliver the best content generation experience.",
  },
  {
    icon: Heart,
    title: "Authentic Growth",
    description:
      "We believe in authentic engagement and helping you build genuine connections on LinkedIn.",
  },
  {
    icon: TrendingUp,
    title: "Results-Focused",
    description:
      "We measure our success by your growth - more engagement, more connections, more opportunities.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Your data security and privacy are paramount. We're committed to the highest standards of protection.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500K+", label: "Posts Generated" },
  { value: "95%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former LinkedIn Sr. Product Manager with 10+ years in social media",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "AI/ML expert from Stanford, previously at OpenAI",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    bio: "Product leader with experience at HubSpot and Salesforce",
  },
  {
    name: "David Kim",
    role: "Head of Customer Success",
    bio: "Customer experience specialist with 8+ years helping SaaS companies grow",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              We're building the future of{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                LinkedIn content
              </span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Repost AI was founded in 2024 with a simple belief: everyone deserves
              the tools to build a powerful professional brand on LinkedIn, regardless
              of their writing skills or time constraints.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-text-primary mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
              <p>
                Repost AI started when our founder, Sarah Johnson, was working at
                LinkedIn and noticed a common struggle: professionals knew they needed
                to post consistently to build their brand, but creating engaging
                content was time-consuming and challenging.
              </p>
              <p>
                After leaving LinkedIn, Sarah assembled a team of AI engineers,
                product designers, and LinkedIn experts to solve this problem. The
                result is Repost AI - an intelligent platform that combines advanced AI
                with deep insights from viral LinkedIn content to help anyone create
                posts that resonate.
              </p>
              <p>
                Today, we're proud to serve thousands of professionals, from founders
                and executives to marketers and creators, helping them save time while
                growing their LinkedIn presence authentically.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-light-green/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              Our Values
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We're a passionate group of builders, designers, and LinkedIn experts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary mb-2">{member.role}</p>
                <p className="text-sm text-text-secondary">{member.bio}</p>
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
          <h2 className="text-4xl font-bold mb-6">Join us on our mission</h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for talented people who share our passion for
            helping professionals succeed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              View Open Positions
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

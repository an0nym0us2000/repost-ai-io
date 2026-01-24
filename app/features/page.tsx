"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wand2,
  Calendar,
  BarChart3,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Target,
  Brain,
  Clock,
  MessageSquare,
  Eye,
  Layers,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Content Generation",
    description:
      "Generate engaging LinkedIn posts in seconds using advanced AI trained on viral content. Choose your tone, style, and topic to create posts that resonate with your audience.",
    benefits: [
      "Multiple tone options (Professional, Casual, Enthusiastic, etc.)",
      "Customizable content length",
      "Industry-specific recommendations",
      "Emoji and hashtag optimization",
    ],
    gradient: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    title: "Trending Content Discovery",
    description:
      "Discover what's working right now on LinkedIn. Browse viral posts from top creators, analyze engagement patterns, and get inspired by proven content strategies.",
    benefits: [
      "Real-time trending posts from last 7 days",
      "Advanced filtering by engagement, media type, and keywords",
      "Outlier index showing virality multiplier",
      "Save and repurpose trending content",
    ],
    gradient: "from-accent to-primary",
  },
  {
    icon: Calendar,
    title: "Smart Content Calendar",
    description:
      "Plan, schedule, and manage your LinkedIn content with an intuitive calendar interface. Never miss a posting opportunity with automated scheduling.",
    benefits: [
      "Month, week, and day views",
      "Drag-and-drop rescheduling",
      "Best time recommendations",
      "Bulk scheduling capabilities",
    ],
    gradient: "from-primary to-primary-dark",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track your LinkedIn performance with comprehensive analytics. Understand what content works best and optimize your strategy for maximum engagement.",
    benefits: [
      "Real-time engagement tracking",
      "Post performance comparison",
      "Audience growth insights",
      "Engagement rate analysis",
    ],
    gradient: "from-accent to-primary",
  },
  {
    icon: Users,
    title: "Creator Discovery & Following",
    description:
      "Find and follow top LinkedIn creators in your industry. Learn from the best by analyzing their content strategies and engagement patterns.",
    benefits: [
      "Curated list of top creators",
      "Industry-specific recommendations",
      "Track favorite creators' content",
      "Engagement insights per creator",
    ],
    gradient: "from-primary to-accent",
  },
  {
    icon: Brain,
    title: "RAG-Powered Intelligence",
    description:
      "Our AI uses Retrieval-Augmented Generation (RAG) to analyze thousands of viral posts and generate content that follows proven patterns for success.",
    benefits: [
      "Vector search through viral content database",
      "Pattern extraction from successful posts",
      "Similarity-based recommendations",
      "Continuous learning from trending content",
    ],
    gradient: "from-accent to-primary-dark",
  },
  {
    icon: Target,
    title: "Suggested Topics",
    description:
      "Never run out of ideas. Get AI-generated topic suggestions based on current LinkedIn trends, your industry, and interests.",
    benefits: [
      "Weekly trend analysis",
      "Industry-specific topics",
      "Personalized recommendations",
      "Save favorite topics",
    ],
    gradient: "from-primary to-accent",
  },
  {
    icon: MessageSquare,
    title: "Content Repurposing",
    description:
      "Transform viral content into your unique voice. Our repurpose feature helps you recreate successful posts while maintaining authenticity.",
    benefits: [
      "One-click repurpose from trending posts",
      "Maintain your unique voice and style",
      "AI-powered content transformation",
      "Citation and credit suggestions",
    ],
    gradient: "from-accent to-primary",
  },
  {
    icon: Layers,
    title: "Multi-Account Support",
    description:
      "Manage multiple LinkedIn accounts from a single dashboard. Perfect for agencies, teams, and individuals with multiple professional personas.",
    benefits: [
      "Seamless account switching",
      "Individual analytics per account",
      "Separate content calendars",
      "Team collaboration features",
    ],
    gradient: "from-primary-dark to-accent",
  },
  {
    icon: Clock,
    title: "Optimal Timing Suggestions",
    description:
      "Post when your audience is most active. Our AI analyzes engagement patterns to recommend the best times to publish your content.",
    benefits: [
      "Personalized posting times",
      "Industry best practices",
      "Timezone optimization",
      "Automatic scheduling adjustments",
    ],
    gradient: "from-primary to-primary-dark",
  },
  {
    icon: Eye,
    title: "Content Preview & Editing",
    description:
      "See exactly how your post will look on LinkedIn before publishing. Edit, refine, and perfect your content with our intuitive editor.",
    benefits: [
      "Real-time LinkedIn preview",
      "Rich text formatting",
      "Media upload and preview",
      "Character count and optimization tips",
    ],
    gradient: "from-accent to-primary",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Your data is protected with bank-level security. We never store your LinkedIn password and use OAuth 2.0 for secure authentication.",
    benefits: [
      "OAuth 2.0 authentication",
      "End-to-end encryption",
      "GDPR compliant",
      "Regular security audits",
    ],
    gradient: "from-primary to-accent",
  },
];

const integrationFeatures = [
  {
    title: "LinkedIn Integration",
    description: "Seamless OAuth connection with LinkedIn for secure posting",
  },
  {
    title: "Media Management",
    description: "Upload and manage images, videos, and documents",
  },
  {
    title: "Draft Management",
    description: "Save unlimited drafts and work on multiple posts",
  },
  {
    title: "Engagement Tracking",
    description: "Real-time sync of likes, comments, shares, and views",
  },
  {
    title: "Export & Backup",
    description: "Export your content and analytics anytime",
  },
  {
    title: "API Access",
    description: "RESTful API for custom integrations (Pro plan)",
  },
];

export default function FeaturesPage() {
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
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Powerful Features
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                dominate LinkedIn
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Repost AI combines cutting-edge AI technology with powerful content
              management tools to help you create, schedule, and optimize your
              LinkedIn presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-light-green/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
              Seamless Integrations
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Connect your tools and workflows for a complete content management
              experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
              >
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
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
          <Globe className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to supercharge your LinkedIn?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals using Repost AI to grow their personal
            brand and generate leads
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

import { Shield, Lock, Eye, Server, Key, CheckCircle2 } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All data transmission is encrypted using industry-standard SSL/TLS protocols (256-bit encryption).",
  },
  {
    icon: Key,
    title: "OAuth 2.0 Authentication",
    description:
      "We never store your LinkedIn password. All authentication is handled securely through LinkedIn's OAuth 2.0 protocol.",
  },
  {
    icon: Server,
    title: "Secure Data Storage",
    description:
      "Your data is stored on enterprise-grade servers with encryption at rest, regular backups, and redundancy.",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description:
      "We collect only the minimum data necessary and never sell your personal information to third parties.",
  },
  {
    icon: Shield,
    title: "Regular Security Audits",
    description:
      "We conduct regular security audits, penetration testing, and vulnerability assessments.",
  },
  {
    icon: CheckCircle2,
    title: "Compliance & Certifications",
    description:
      "GDPR compliant, CCPA compliant, and following SOC 2 Type II standards.",
  },
];

const practices = [
  "Multi-factor authentication (MFA) available",
  "Role-based access control (RBAC)",
  "Automated threat detection and monitoring",
  "Regular security training for all team members",
  "Incident response plan with 24/7 monitoring",
  "Data backup and disaster recovery procedures",
  "Secure API endpoints with rate limiting",
  "Regular dependency updates and patches",
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Security & Trust
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-text-primary mb-6">
            Your Security is Our{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
              Top Priority
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We implement enterprise-grade security measures to protect your data and
            ensure your trust in our platform.
          </p>
        </div>

        {/* Security Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Security Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
              Our Security Practices
            </h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {practices.map((practice, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-text-secondary">{practice}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            Data Protection & Privacy
          </h2>
          <div className="prose prose-lg max-w-none text-text-secondary space-y-4">
            <h3 className="text-2xl font-semibold text-text-primary">
              What Data We Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email)</li>
              <li>LinkedIn profile data (via OAuth)</li>
              <li>Content you create and schedule</li>
              <li>Usage analytics and performance data</li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mt-8">
              What We Don't Collect
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>LinkedIn passwords (we use OAuth)</li>
              <li>Credit card details (handled by Stripe)</li>
              <li>Private messages or DMs</li>
              <li>Data from other social media platforms</li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mt-8">
              How We Protect Your Data
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption in transit and at rest</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits</li>
              <li>Compliance with GDPR, CCPA, and other regulations</li>
              <li>Secure data centers with physical security</li>
            </ul>
          </div>
        </section>

        {/* Vulnerability Disclosure */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Responsible Disclosure
            </h2>
            <p className="text-text-secondary mb-6">
              We take security vulnerabilities seriously. If you discover a security
              issue, please report it responsibly:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
              <li>Email: security@reepost.ai</li>
              <li>Do not publicly disclose the vulnerability before we've addressed it</li>
              <li>Provide detailed information to help us reproduce and fix the issue</li>
              <li>Allow us reasonable time to address the vulnerability</li>
            </ul>
            <p className="text-sm text-text-secondary">
              We appreciate responsible security researchers and will acknowledge your
              contribution (unless you prefer to remain anonymous).
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Have Security Questions?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our security team is here to answer any questions you may have
            </p>
            <a
              href="mailto:security@reepost.ai"
              className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105"
            >
              Contact Security Team
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

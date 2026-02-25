import { Shield } from "lucide-react";
import NewHeader from "@/components/landing/NewHeader";
import NewFooter from "@/components/landing/NewFooter";

export default function PrivacyPage() {
  return (
    <>
      <NewHeader />
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Privacy Policy
            </span>
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-6">
            Privacy Policy
          </h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to Repost AI ("we," "our," or "us"). We are committed to
              protecting your personal information and your right to privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our service.
            </p>
            <p>
              By using Repost AI, you agree to the collection and use of information
              in accordance with this policy. If you do not agree with our policies
              and practices, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">
              2.1 Personal Information
            </h3>
            <p>We collect the following personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address, LinkedIn
                profile information
              </li>
              <li>
                <strong>LinkedIn OAuth Data:</strong> Access tokens, profile data
                (we never store your LinkedIn password)
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely through
                Stripe (we do not store credit card details)
              </li>
              <li>
                <strong>Usage Data:</strong> Content you create, posts you schedule,
                analytics data
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Device Information:</strong> IP address, browser type,
                operating system
              </li>
              <li>
                <strong>Usage Analytics:</strong> Pages visited, features used,
                time spent on platform
              </li>
              <li>
                <strong>Cookies:</strong> See our Cookie Policy for details
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Generate AI-powered content based on your preferences</li>
              <li>Schedule and publish posts to your LinkedIn account</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send service updates, security alerts, and support messages</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              4. How We Share Your Information
            </h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> OpenAI (for AI generation),
                Stripe (payment processing), hosting providers
              </li>
              <li>
                <strong>LinkedIn:</strong> When you authorize us to post on your
                behalf via OAuth
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger,
                acquisition, or sale of assets
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for data transmission (SSL/TLS)</li>
              <li>Encrypted storage of sensitive data</li>
              <li>OAuth 2.0 for LinkedIn authentication (we never store passwords)</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Monitoring for suspicious activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              6. Your Privacy Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
              </li>
              <li>
                <strong>Correction:</strong> Update or correct your information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and data
              </li>
              <li>
                <strong>Export:</strong> Download your content and data
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from marketing emails
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Revoke LinkedIn OAuth access
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at privacy@reepost.ai
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              7. Data Retention
            </h2>
            <p>
              We retain your information for as long as your account is active or as
              needed to provide services. When you delete your account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal data is deleted within 30 days</li>
              <li>Backup copies are removed within 90 days</li>
              <li>Some data may be retained for legal compliance (e.g., tax records)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              8. International Data Transfers
            </h2>
            <p>
              Your information may be transferred to and processed in countries other
              than your own. We ensure appropriate safeguards are in place through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>Privacy Shield certification (where applicable)</li>
              <li>GDPR compliance for EU users</li>
              <li>CCPA compliance for California residents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              9. Children's Privacy
            </h2>
            <p>
              Our service is not intended for users under 18 years of age. We do not
              knowingly collect personal information from children. If you believe we
              have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you
              of significant changes via email or through the service. Your continued
              use after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              11. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>Email: privacy@reepost.ai</li>
              <li>Address: Repost AI, Inc., San Francisco, CA 94103</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
      <NewFooter />
    </>
  );
}

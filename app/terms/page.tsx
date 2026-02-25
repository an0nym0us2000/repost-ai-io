import { FileText } from "lucide-react";
import NewHeader from "@/components/landing/NewHeader";
import NewFooter from "@/components/landing/NewFooter";

export default function TermsPage() {
  return (
    <>
      <NewHeader />
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-6">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Terms of Service
            </span>
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-6">
            Terms of Service
          </h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Repost AI ("Service"), you agree to be bound by
              these Terms of Service ("Terms"). If you disagree with any part of
              these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              2. Description of Service
            </h2>
            <p>
              Repost AI is an AI-powered LinkedIn content generation and management
              platform that helps users create, schedule, and analyze LinkedIn posts.
              The Service includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-generated content creation</li>
              <li>Content calendar and scheduling</li>
              <li>Trending content discovery</li>
              <li>Analytics and insights</li>
              <li>LinkedIn integration via OAuth</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              3. User Accounts
            </h2>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">
              3.1 Account Creation
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use the Service</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must not share your account credentials</li>
              <li>One person or legal entity per account</li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              3.2 Account Termination
            </h3>
            <p>We may suspend or terminate your account if you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate these Terms</li>
              <li>Engage in fraudulent activity</li>
              <li>Abuse the Service or other users</li>
              <li>Fail to pay subscription fees</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              4. Acceptable Use Policy
            </h2>
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Generate spam, harassment, or offensive content</li>
              <li>Impersonate others or misrepresent your identity</li>
              <li>Attempt to hack, reverse engineer, or exploit the Service</li>
              <li>Use automated tools to abuse the Service (beyond our API)</li>
              <li>Resell or redistribute the Service without permission</li>
              <li>Violate LinkedIn's terms of service</li>
              <li>Generate content that infringes intellectual property rights</li>
              <li>Use the Service to spread misinformation or fake news</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              5. Subscription and Payment
            </h2>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">
              5.1 Pricing
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free Plan: $0/month with limited features</li>
              <li>Starter Plan: $19/month</li>
              <li>Pro Plan: $49/month</li>
              <li>Enterprise Plan: Custom pricing</li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              5.2 Billing
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions are billed monthly or annually in advance</li>
              <li>Payments are processed securely through Stripe</li>
              <li>All fees are in USD unless otherwise stated</li>
              <li>Failed payments may result in service suspension</li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              5.3 Refunds
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>14-day money-back guarantee on first purchase</li>
              <li>Refunds are processed within 5-10 business days</li>
              <li>No refunds for partial months or unused features</li>
            </ul>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              5.4 Cancellation
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may cancel anytime from your account settings</li>
              <li>Cancellation takes effect at end of billing period</li>
              <li>No refunds for remaining time in current period</li>
              <li>Access continues until end of paid period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              6. Intellectual Property
            </h2>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">
              6.1 Service Content
            </h3>
            <p>
              The Service, including its original content, features, and
              functionality, is owned by Repost AI and is protected by copyright,
              trademark, and other laws.
            </p>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              6.2 User Content
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain all rights to content you create using the Service</li>
              <li>
                You grant us a license to use your content to provide and improve
                the Service
              </li>
              <li>AI-generated content is licensed to you for your use</li>
              <li>You are responsible for ensuring your content doesn't infringe
                third-party rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              7. Third-Party Services
            </h2>
            <p>
              The Service integrates with third-party services including LinkedIn,
              OpenAI, and payment processors. Your use of these services is subject
              to their respective terms and privacy policies. We are not responsible
              for third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              8. Disclaimer of Warranties
            </h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO
              NOT GUARANTEE:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy or quality of AI-generated content</li>
              <li>Specific results or engagement on LinkedIn</li>
              <li>Compatibility with all devices or browsers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, REPOST AI SHALL NOT BE LIABLE
              FOR:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages exceeding amount paid for the Service in past 12 months</li>
              <li>Actions of third-party services (LinkedIn, OpenAI, etc.)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              10. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold Repost AI harmless from any claims,
              damages, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Service</li>
              <li>Violation of these Terms</li>
              <li>Infringement of third-party rights</li>
              <li>Content you create or publish</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify
              users of significant changes via email or through the Service. Continued
              use after changes constitutes acceptance of new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              12. Governing Law
            </h2>
            <p>
              These Terms shall be governed by the laws of the State of California,
              United States, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              13. Dispute Resolution
            </h2>
            <p>
              Any disputes shall first be resolved through good faith negotiations. If
              unresolved within 30 days, disputes shall be settled through binding
              arbitration in San Francisco, California.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              14. Contact Information
            </h2>
            <p>
              For questions about these Terms, contact us:
            </p>
            <ul className="list-none space-y-2 mt-4">
              <li>Email: legal@reepost.ai</li>
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

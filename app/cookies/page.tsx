import { Cookie } from "lucide-react";
import NewHeader from "@/components/landing/NewHeader";
import NewFooter from "@/components/landing/NewFooter";

export default function CookiesPage() {
  return (
    <>
      <NewHeader />
    <div className="min-h-screen bg-gradient-to-b from-white via-light-green/20 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full mb-6">
            <Cookie className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Cookie Policy
            </span>
          </div>
          <h1 className="text-5xl font-bold text-text-primary mb-6">
            Cookie Policy
          </h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files placed on your device when you visit our
              website. They help us provide you with a better experience by
              remembering your preferences and understanding how you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Types of Cookies We Use
            </h2>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              1. Essential Cookies
            </h3>
            <p>
              These cookies are necessary for the website to function properly. They
              enable core functionality such as security, authentication, and
              accessibility features.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
              <strong className="text-text-primary">Examples:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Session authentication cookies</li>
                <li>Security tokens</li>
                <li>Load balancing cookies</li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Session or up to 1 year<br />
                <strong>Can be disabled:</strong> No (required for service)
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-8">
              2. Functional Cookies
            </h3>
            <p>
              These cookies allow us to remember choices you make (such as your
              username, language, or region) and provide enhanced, personalized
              features.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
              <strong className="text-text-primary">Examples:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>User preferences (theme, language)</li>
                <li>Recently viewed content</li>
                <li>Saved filter settings</li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Up to 1 year<br />
                <strong>Can be disabled:</strong> Yes
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-8">
              3. Analytics Cookies
            </h3>
            <p>
              These cookies help us understand how visitors interact with our website
              by collecting and reporting information anonymously. We use this data to
              improve our service.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
              <strong className="text-text-primary">Examples:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Page visit tracking</li>
                <li>Feature usage analytics</li>
                <li>Error tracking</li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Up to 2 years<br />
                <strong>Can be disabled:</strong> Yes
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-8">
              4. Marketing Cookies
            </h3>
            <p>
              These cookies track your online activity to help us deliver more relevant
              advertising. They may be set by us or third-party partners.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
              <strong className="text-text-primary">Examples:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Ad campaign tracking</li>
                <li>Social media pixels</li>
                <li>Retargeting cookies</li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Up to 1 year<br />
                <strong>Can be disabled:</strong> Yes
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Third-Party Cookies
            </h2>
            <p>
              We use services from trusted third-party providers that may set cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Google Analytics:</strong> Website analytics
              </li>
              <li>
                <strong>Stripe:</strong> Payment processing
              </li>
              <li>
                <strong>LinkedIn:</strong> OAuth authentication and social features
              </li>
              <li>
                <strong>Intercom/LiveChat:</strong> Customer support chat
              </li>
            </ul>
            <p className="mt-4">
              These third parties have their own privacy policies. We recommend
              reviewing them for more information.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Managing Your Cookie Preferences
            </h2>
            <p>You have several options to manage cookies:</p>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              Browser Settings
            </h3>
            <p>
              Most browsers allow you to control cookies through settings. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies when you close your browser</li>
              <li>View and delete individual cookies</li>
            </ul>
            <p className="mt-4">
              Note: Blocking certain cookies may affect website functionality.
            </p>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              Our Cookie Consent Tool
            </h3>
            <p>
              When you first visit our website, you'll see a cookie consent banner
              where you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accept all cookies</li>
              <li>Customize your preferences by category</li>
              <li>Reject non-essential cookies</li>
            </ul>
            <p className="mt-4">
              You can change your preferences at any time through your account settings
              or by clicking the cookie icon in the footer.
            </p>

            <h3 className="text-2xl font-semibold text-text-primary mb-3 mt-6">
              Opt-Out Links
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics Opt-Out
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Digital Advertising Alliance Opt-Out
                </a>
              </li>
              <li>
                <a
                  href="https://youronlinechoices.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  European Interactive Digital Advertising Alliance
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Do Not Track Signals
            </h2>
            <p>
              Some browsers include a "Do Not Track" (DNT) feature. Currently, there is
              no industry standard for responding to DNT signals. We do not currently
              respond to DNT signals, but we respect your privacy choices and provide
              granular cookie controls.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time. When we make changes,
              we will update the "Last updated" date at the top of this page. We
              encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about our use of cookies, please contact us:
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

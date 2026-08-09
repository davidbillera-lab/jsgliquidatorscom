import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

const LAST_UPDATED = "August 9, 2026";

const Privacy = () => {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy"
        description="How JSG Liquidators collects, uses, and protects information submitted through jsgliquidators.com, including contact form details and website analytics."
        canonical="/privacy"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Who we are</h2>
            <p>
              JSG Liquidators ("we", "us") provides estate sale, e-commerce consignment,
              business liquidation, cleanout, and junk removal services in the Denver metro
              area. This policy explains what information we collect through
              jsgliquidators.com and how we use it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Information we collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Information you give us:</strong> name, phone
                number, email address, property location, and any details you include when you
                submit our contact or quote request forms, call us, or email us.
              </li>
              <li>
                <strong className="text-foreground">Automatically collected data:</strong> pages
                viewed, referring site, approximate location, device and browser type, collected
                through Google Analytics, Google Tag Manager, and Google Ads tags.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">How we use it</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your inquiry and provide a quote or schedule service.</li>
              <li>To communicate with you about your project, including follow-up and review requests.</li>
              <li>To measure website performance and the effectiveness of our advertising.</li>
              <li>To meet legal, accounting, and record-keeping obligations.</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Service providers</h2>
            <p>
              We share information only with the vendors that help us operate the site and our
              business — website and database hosting, email delivery, and analytics/advertising
              providers such as Google. These providers may only use the information to perform
              services for us.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Cookies and tracking</h2>
            <p>
              Our site uses cookies and similar technologies for analytics and advertising
              measurement. You can block or delete cookies in your browser settings; some parts of
              the site may not function as intended if you do. You can also opt out of Google
              Analytics using Google's browser add-on.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Text messages and calls</h2>
            <p>
              If you provide a phone number, you consent to be contacted by phone, text, or email
              about your request. Message and data rates may apply. Reply STOP to opt out of text
              messages at any time.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Data retention and security</h2>
            <p>
              We keep inquiry and customer records for as long as needed to serve you and to meet
              business and legal requirements, then delete or archive them. We use reasonable
              administrative and technical safeguards to protect the information we hold. No method
              of transmission over the internet is completely secure.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Your choices</h2>
            <p>
              You may request a copy of the personal information we hold about you, ask us to
              correct it, or ask us to delete it. Email{" "}
              <a href="mailto:jsgliquidators@gmail.com" className="text-primary hover:underline">
                jsgliquidators@gmail.com
              </a>{" "}
              and we will respond within a reasonable time.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Children</h2>
            <p>
              Our services are intended for adults. We do not knowingly collect information from
              children under 13.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The revised version will be posted on
              this page with a new "last updated" date.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Contact us</h2>
            <p>
              JSG Liquidators — Serving the Greater Denver Metro Area
              <br />
              David:{" "}
              <a href="tel:805-444-4069" className="text-primary hover:underline">
                (805) 444-4069
              </a>
              <br />
              Vincent:{" "}
              <a href="tel:805-340-4817" className="text-primary hover:underline">
                (805) 340-4817
              </a>
              <br />
              Email:{" "}
              <a href="mailto:jsgliquidators@gmail.com" className="text-primary hover:underline">
                jsgliquidators@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;

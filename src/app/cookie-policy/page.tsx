import Image from "next/image";
import privacy from "@/images/privacy.svg";

const headingStyle = {
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "140%",
  letterSpacing: "-0.02em",
  color: "var(--text-heading)",
};

const bodyStyle = {
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "-0.01em",
  color: "var(--text-body)",
};

export default function CookiePolicyPage() {
  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "228px" }}>
          <Image
            src={privacy}
            alt="Cookie Policy"
            fill
            className="object-cover"
            style={{ borderRadius: "16px" }}
            priority
            sizes="(max-width: 768px) 100vw, 1408px"
            loading="eager"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h1
              className="text-white text-center md:!text-[56px] md:!leading-[110%] md:!tracking-[-0.03em]"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "135%",
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              Cookie Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="mx-auto" style={{ maxWidth: "968px" }}>
          <p style={{ ...bodyStyle, marginBottom: "24px" }}>
            This Cookie Policy explains how Evisaeta (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) uses cookies and similar tracking technologies on evisaeta.co.uk (the &quot;Website&quot;). By continuing to use our Website, you agree to our use of cookies as described in this policy, unless you disable them as explained below.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>What Are Cookies?</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Cookies are small text files placed on your device when you visit a website. They help the website function properly, remember your preferences, and provide insights into how visitors use the site.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Types of Cookies We Use</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Essential Cookies Required for the Website to function properly, including enabling secure access, form submission, and progress-saving during your application. These cannot be disabled without affecting core functionality.
          </p>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Performance &amp; Analytics Cookies Help us understand how visitors use our Website (e.g. pages visited, time spent, errors encountered) so we can improve our services. These may be provided by third-party analytics tools.
          </p>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Functionality Cookies Remember your preferences (e.g. selected destination or language) to provide a more personalised experience.
          </p>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Marketing Cookies Used to deliver relevant advertising and measure the effectiveness of our marketing campaigns. These may be set by us or by third-party advertising partners.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Third-Party Cookies</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Some cookies on our Website are placed by trusted third parties, such as analytics providers and payment processors, to help us operate and improve our Services. We do not control these third-party cookies directly; please refer to the respective third party&apos;s cookie or privacy policy for more information.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Managing Your Cookie Preferences</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            You can manage or disable cookies at any time by:
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Using the \u201cManage my cookies\u201d option available in our Website footer",
              "Adjusting your browser settings to block or delete cookies",
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                <span style={{ ...bodyStyle }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Please note that disabling essential cookies may affect your ability to complete an application or use certain features of the Website.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Changes to This Policy</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            We may update this Cookie Policy periodically to reflect changes in technology, regulation, or our practices. Any changes will be posted on this page with a revised &quot;Last updated&quot; date.
          </p>
        </div>
      </div>
    </main>
  );
}

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

export default function RefundPolicyPage() {
  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "228px" }}>
          <Image
            src={privacy}
            alt="Refund Policy"
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
              Refund Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="mx-auto" style={{ maxWidth: "968px" }}>
          <p style={{ fontSize: "14px", fontWeight: 400, color: "var(--muted)", marginBottom: "16px" }}>
            Last updated: September 5, 2026
          </p>
          <p style={{ ...bodyStyle, marginBottom: "24px" }}>
            This Refund Policy explains when and how you may request a refund for services provided by Evisaeta (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) through evisaeta.co.uk (the &quot;Website&quot;). By using our Services, you agree to the terms outlined below.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Our Service Fee</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Our fee covers the guidance, review, and submission assistance we provide for your UK ETA application. This fee is separate from any government application fee, where applicable, and is charged for the work performed by our team regardless of the final outcome of your application.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>When You Are Eligible for a Refund</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            You may be eligible for a full or partial refund if:
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "We made an error in submitting your application that directly caused a rejection",
              "Your payment was charged in duplicate or in error",
              "You cancel your request before your application has been reviewed and submitted to the relevant government authority",
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                <span style={{ ...bodyStyle }}>{item}</span>
              </div>
            ))}
          </div>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>When You Are Not Eligible for a Refund</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Refunds are generally not available in the following situations:
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Your application was submitted correctly, but was rejected, delayed, or refused by the relevant government authority for reasons outside our control (e.g. eligibility, background checks, or incomplete disclosures by the applicant)",
              "You provided false, inaccurate, or incomplete information that led to a rejection",
              "You changed your mind after your application had already been reviewed and submitted",
              "You no longer intend to travel, but your application was processed correctly",
              "Delays caused by the government authority\u2019s own processing times",
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                <span style={{ ...bodyStyle }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Because approval decisions are made solely by the relevant government authority and not by us, we cannot offer refunds based on application outcomes once your application has been correctly submitted.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>How to Request a Refund</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            To request a refund, contact us.
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Your full name and application reference number",
              "The reason for your refund request",
              "Any supporting information relevant to your request",
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                <span style={{ ...bodyStyle }}>{item}</span>
              </div>
            ))}
          </div>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Refund Processing</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Approved refunds will be processed back to your original payment method within 5-10 business days of approval. Processing times may vary depending on your bank or payment provider.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Government Fees</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            If a government application fee was paid separately as part of your application, please note that such fees are non-refundable by us and are subject to the relevant government authority&apos;s own refund policy, if any.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Changes to This Policy</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            We may update this Refund Policy from time to time. Changes will be posted on this page with a revised &quot;Last updated&quot; date.
          </p>
        </div>
      </div>
    </main>
  );
}

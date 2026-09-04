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

export default function MigrationRulesPage() {
  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "228px" }}>
          <Image
            src={privacy}
            alt="Migration Rules & Disclaimer"
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
              Migration Rules &amp; Disclaimer
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
            This disclaimer applies to all information provided on evisaeta.co.uk (the &quot;Website&quot;) and through our application assistance services (the &quot;Services&quot;). Please read it carefully before using our Services.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Independent Service</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Evisaeta is an independent, privately-operated service. We are not a government department, embassy, consulate, or agency of the UK government or any other government. We are not affiliated with, endorsed by, or acting under the authority of any government body. References to &quot;UK ETA&quot; or similar terms on this Website relate to the official Electronic Travel Authorisation scheme operated by the UK government, which we assist applicants in applying for.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>No Legal or Immigration Advice</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            We are not a law firm and do not provide legal, immigration, or migration advice unless explicitly stated and provided by an appropriately licensed professional. The information on our Website is provided for general guidance purposes only and should not be relied upon as a substitute for professional legal or immigration advice specific to your circumstances.
          </p>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            If you have questions about your eligibility, immigration status, or individual case, we strongly recommend consulting:
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "A qualified immigration lawyer or registered migration agent, or",
              "The official UK government website or a UK government helpline directly",
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                <span style={{ ...bodyStyle }}>{item}</span>
              </div>
            ))}
          </div>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Accuracy of Migration Information</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Immigration and travel authorization rules, requirements, and processing times can change at any time and without prior notice. While we make reasonable efforts to keep the information on our Website accurate and up to date, we do not guarantee that all content reflects the most current government rules or requirements at any given time.
          </p>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            We recommend verifying critical requirements directly with the official government website before travel.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>No Guarantee of Approval</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Submitting an application through our Services does not guarantee approval of your ETA. All decisions regarding travel authorization, entry, or visa status are made solely by the relevant government authority, based on its own criteria, discretion, and procedures. We have no influence over, and are not responsible for, the outcome of any application.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Applicant Responsibility</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            You are responsible for:
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "Ensuring the accuracy and truthfulness of all information provided",
              "Reviewing your own eligibility for travel authorization based on your nationality, travel purpose, and personal circumstances",
              "Disclosing any relevant information (e.g. criminal history, prior visa refusals) truthfully, as required by the relevant government authority",
            ].map((item, i) => (
              <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                <span style={{ ...bodyStyle }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Failure to provide accurate or complete information may result in rejection of your application, refusal of entry, or other legal consequences, for which we are not liable.
          </p>

          <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Changes in Migration Rules</h2>
          <p style={{ ...bodyStyle, marginTop: "8px" }}>
            Migration and travel authorization requirements are subject to change by the relevant government authority at any time. We are not responsible for any loss, cost, or inconvenience arising from changes to migration rules that occur after your application has been submitted or approved.
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import privacy from "@/images/privacy.svg";

const sections = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "how-we-share", label: "How We Share Your Information" },
  { id: "data-retention", label: "Data Retention" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights" },
  { id: "international-transfers", label: "International Data Transfers" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "changes-to-policy", label: "Changes to This Policy" },
];

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

const tocItemStyle = {
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "-0.01em",
  color: "var(--text-body)",
};

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveSection(index);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    setTocOpen(false);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "228px" }}>
          <Image
            src={privacy}
            alt="Privacy Policy"
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
        {/* Mobile: Table of Contents Dropdown */}
        <div className="md:hidden" style={{ marginBottom: "24px" }}>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
            style={{ background: "var(--form-bg)" }}
          >
            <span style={{ ...headingStyle, fontSize: "16px" }}>Table of Contents</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${tocOpen ? "rotate-180" : ""}`} style={{ color: "var(--primary)" }} />
          </button>
          {tocOpen && (
            <div className="mt-2 flex flex-col rounded-lg border border-gray-200 px-4 py-2" style={{ background: "var(--form-bg)" }}>
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  style={{
                    ...tocItemStyle,
                    padding: "8px 0",
                    cursor: "pointer",
                    color: activeSection === index ? "var(--primary)" : "var(--text-body)",
                    fontWeight: activeSection === index ? 500 : 400,
                  }}
                >
                  {section.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row" style={{ gap: "80px" }}>
          {/* Left: Table of Contents - Desktop only */}
          <div className="hidden md:flex md:flex-col" style={{ flexShrink: 0, width: "300px", position: "sticky", top: "40px", height: "fit-content", alignSelf: "flex-start" }}>
            <h2 style={{ ...headingStyle, marginBottom: "16px" }}>Table of Contents</h2>
            <div className="relative" style={{ paddingLeft: "16px" }}>
              {/* Track line */}
              <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "2px", background: "var(--form-border)" }} />
              {/* Active progress */}
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "2px",
                  background: "var(--primary)",
                  height: `${((activeSection + 1) / sections.length) * 100}%`,
                  transition: "height 0.3s ease",
                }}
              />
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  style={{
                    ...tocItemStyle,
                    marginBottom: "16px",
                    cursor: "pointer",
                    color: activeSection === index ? "var(--primary)" : "var(--text-body)",
                    fontWeight: activeSection === index ? 500 : 400,
                    transition: "color 0.3s ease, font-weight 0.3s ease",
                    position: "relative",
                  }}
                >
                  {section.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col" style={{ flex: 1 }}>
            <p style={{ ...bodyStyle, marginBottom: "24px" }}>
              Evisaeta (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is an independent travel assistance service that helps applicants prepare and submit UK Electronic Travel Authorisation (eTA) applications. We are not affiliated with, endorsed by, or acting on behalf of the UK government or any government agency. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use evisaeta.co.uk (the &quot;Website&quot;) or our services.
            </p>

            {/* Information We Collect */}
            <div ref={(el) => { sectionRefs.current[0] = el; }} data-index={0} id={sections[0].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Information We Collect</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We collect information you provide directly to us when you use our services, including:
              </p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Identity information: full name, date of birth, gender, nationality, country of birth",
                  "Travel document information: passport number, issue and expiry dates, passport scans or photos",
                  "Contact information: email address, phone number, postal address",
                  "Payment information: billing details processed via our secure third-party payment provider (we do not store full card details)",
                  "Application details: travel history, purpose of travel, and answers provided in the guided application form",
                  "Technical information: IP address, browser type, device information, and cookies (see our Cookie Policy)",
                ].map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                    <span style={{ ...bodyStyle }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Use Your Information */}
            <div ref={(el) => { sectionRefs.current[1] = el; }} data-index={1} id={sections[1].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>How We Use Your Information</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>We use your information to:</p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Prepare, review, and submit your eTA application to the relevant government portal",
                  "Communicate with you about your application status, approvals, or issues",
                  "Verify the accuracy of the information provided and reduce the risk of application errors or rejection",
                  "Process payments for our service fees",
                  "Provide customer support",
                  "Improve our website, services, and application process",
                  "Comply with legal and regulatory obligations",
                ].map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                    <span style={{ ...bodyStyle }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We do not sell your personal information to third parties.
              </p>
            </div>

            {/* How We Share Your Information */}
            <div ref={(el) => { sectionRefs.current[2] = el; }} data-index={2} id={sections[2].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>How We Share Your Information</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>We may share your information with:</p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Relevant government authorities, solely for the purpose of submitting your eTA application on your behalf",
                  "Payment processors, to complete secure transactions",
                  "IT and hosting providers, who help us operate the Website and store data securely",
                  "Professional advisors (e.g. auditors, legal counsel), where necessary",
                  "Authorities, where required by law, regulation, or valid legal process",
                ].map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                    <span style={{ ...bodyStyle }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We require all third parties to respect the security of your data and treat it in accordance with applicable law.
              </p>
            </div>

            {/* Data Retention */}
            <div ref={(el) => { sectionRefs.current[3] = el; }} data-index={3} id={sections[3].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Data Retention</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We retain your personal information only for as long as necessary to:
              </p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Complete the service you requested",
                  "Comply with legal, tax, or regulatory requirements",
                  "Resolve disputes and enforce our agreements",
                ].map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                    <span style={{ ...bodyStyle }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Passport and application data is retained for a limited period after your application is completed and is then securely deleted or anonymised, unless a longer retention period is required by law.
              </p>
            </div>

            {/* Placeholder sections for remaining */}
            <div ref={(el) => { sectionRefs.current[4] = el; }} data-index={4} id={sections[4].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Data Security</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We use industry-standard technical and organisational measures, including encryption, secure servers, and restricted access controls, to protect your personal information against unauthorised access, loss, or misuse. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current[5] = el; }} data-index={5} id={sections[5].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Your Rights</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>Depending on your location, you may have the right to:</p>
              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "Access the personal information we hold about you",
                  "Request correction of inaccurate or incomplete information",
                  "Request deletion of your personal information (subject to legal retention requirements)",
                  "Object to or restrict certain processing of your information",
                  "Request a copy of your data in a portable format",
                  "Withdraw consent where processing is based on consent",
                ].map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "8px" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--text-body)", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
                    <span style={{ ...bodyStyle }}>{item}</span>
                  </div>
                ))}
              </div>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                To exercise any of these rights, contact. We may need to verify your identity before processing your request.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current[6] = el; }} data-index={6} id={sections[6].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>International Data Transfers</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                As our team and infrastructure may operate across different countries, your information may be transferred to and processed in countries outside your country of residence. We take steps to ensure such transfers comply with applicable data protection laws.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current[7] = el; }} data-index={7} id={sections[7].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Children&apos;s Privacy</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Our services may involve processing information for minors (as eTA applications must be submitted individually for travellers of all ages, including infants). Such information is submitted by a parent or legal guardian on the minor&apos;s behalf, and we process it solely for the purpose of the travel authorization application.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current[8] = el; }} data-index={8} id={sections[8].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Third-Party Links</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Our Website may contain links to third-party websites, including official government portals. We are not responsible for the privacy practices of those websites, and we encourage you to review their privacy policies separately.
              </p>
            </div>

            <div ref={(el) => { sectionRefs.current[9] = el; }} data-index={9} id={sections[9].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Changes to This Policy</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised &quot;Last updated&quot; date. Continued use of our services after changes are posted constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

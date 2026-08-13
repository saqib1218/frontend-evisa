"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import privacy from "@/images/privacy.svg";

const sections = [
  { id: "about-us", label: "About Us" },
  { id: "our-services", label: "Our Services" },
  { id: "eligibility", label: "Eligibility and Applicant Responsibility" },
  { id: "fees-payment", label: "Fees and Payment" },
  { id: "processing-times", label: "Processing Times" },
  { id: "refunds", label: "Refunds" },
  { id: "no-legal-advice", label: "No Legal Advice" },
  { id: "limitation-liability", label: "Limitation of Liability" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "website-use", label: "Website Use" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "changes-to-terms", label: "Changes to These Terms" },
];

const headingStyle = {
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "140%",
  letterSpacing: "-0.02em",
  color: "#0F0F0F",
};

const bodyStyle = {
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "-0.01em",
  color: "#575757",
};

const tocItemStyle = {
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "150%",
  letterSpacing: "-0.01em",
  color: "#575757",
};

const Dot = () => (
  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#575757", flexShrink: 0, marginTop: "8px", marginLeft: "12px" }} />
);

const BulletList = ({ items }: { items: string[] }) => (
  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
    {items.map((item, i) => (
      <div key={i} className="flex items-start" style={{ gap: "8px" }}>
        <Dot />
        <span style={{ ...bodyStyle }}>{item}</span>
      </div>
    ))}
  </div>
);

export default function TermsConditionsPage() {
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
        <div className="relative w-full md:!h-[400px]" style={{ height: "228px" }}>
          <Image
            src={privacy}
            alt="Terms & Conditions"
            fill
            className="object-cover"
            style={{ borderRadius: "16px" }}
            priority
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
              Terms &amp; Conditions
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
            style={{ background: "#FAFAF9" }}
          >
            <span style={{ ...headingStyle, fontSize: "16px" }}>Table of Contents</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${tocOpen ? "rotate-180" : ""}`} style={{ color: "var(--primary)" }} />
          </button>
          {tocOpen && (
            <div className="mt-2 flex flex-col rounded-lg border border-gray-200 px-4 py-2" style={{ background: "#FAFAF9" }}>
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  style={{
                    ...tocItemStyle,
                    padding: "8px 0",
                    cursor: "pointer",
                    color: activeSection === index ? "var(--primary)" : "#575757",
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
              <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "2px", background: "#D9D9D9" }} />
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
                    color: activeSection === index ? "var(--primary)" : "#575757",
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
              Please read these Terms &amp; Conditions (&quot;Terms&quot;) carefully before using evisaeta.co.uk (the &quot;Website&quot;) or our application assistance services (the &quot;Services&quot;). By using our Website or Services, you agree to be bound by these Terms.
            </p>

            {/* About Us */}
            <div ref={(el) => { sectionRefs.current[0] = el; }} data-index={0} id={sections[0].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>About Us</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Evisaeta is an independent, privately-operated travel assistance service. We are not a government agency, embassy, consulate, or law firm, and we are not affiliated with, endorsed by, or acting on behalf of the UK government or any government department. We assist applicants in completing and submitting UK Electronic Travel Authorisation (eTA) applications correctly. All final decisions regarding travel authorization are made solely by the relevant government authority.
              </p>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                You may apply for a UK eTA directly through the official UK government website without using our Services. Our fee is charged for our review, guidance, and assistance, and is separate from any government application fee.
              </p>
            </div>

            {/* Our Services */}
            <div ref={(el) => { sectionRefs.current[1] = el; }} data-index={1} id={sections[1].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Our Services</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>Our Services include:</p>
              <BulletList items={[
                "Providing a guided, simplified application form",
                "Reviewing your submitted information for accuracy and completeness before submission",
                "Submitting your application to the relevant government portal on your behalf",
                "Providing status updates and customer support throughout the process",
                "Assisting with corrections in the event of errors",
              ]} />
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We do not guarantee approval of any application. Approval, rejection, or any conditions attached to a travel authorization are determined solely by the relevant government authority, in accordance with its own criteria and procedures.
              </p>
            </div>

            {/* Eligibility and Applicant Responsibility */}
            <div ref={(el) => { sectionRefs.current[2] = el; }} data-index={2} id={sections[2].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Eligibility and Applicant Responsibility</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>By using our Services, you confirm that:</p>
              <BulletList items={[
                "You are legally authorized to provide the personal information submitted, including on behalf of any additional travellers (e.g. family members or minors) included in your application",
                "All information you provide is true, accurate, and complete to the best of your knowledge",
                "You understand that providing false or misleading information may result in rejection of your application, refusal of entry, or other legal consequences",
              ]} />
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                You are solely responsible for the accuracy of the information you submit. While our specialists review applications for completeness and consistency, we are not liable for consequences arising from inaccurate or false information provided by you.
              </p>
            </div>

            {/* Fees and Payment */}
            <div ref={(el) => { sectionRefs.current[3] = el; }} data-index={3} id={sections[3].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Fees and Payment</h2>
              <BulletList items={[
                "Our service fee is charged separately from any government eTA fee, where applicable",
                "Fees are disclosed clearly before you complete your application and payment",
                "Payment must be completed in full before we submit your application to the relevant authority",
                "All fees are quoted in the currency displayed at checkout unless otherwise stated",
              ]} />
            </div>

            {/* Processing Times */}
            <div ref={(el) => { sectionRefs.current[4] = el; }} data-index={4} id={sections[4].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Processing Times</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Processing and approval times are estimates only and are determined by the relevant government authority, not by us. While many applications are processed quickly, we do not guarantee any specific processing time, and we are not responsible for delays caused by the government authority, incomplete information, high application volumes, or circumstances beyond our control.
              </p>
            </div>

            {/* Refunds */}
            <div ref={(el) => { sectionRefs.current[5] = el; }} data-index={5} id={sections[5].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Refunds</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Refunds are handled in accordance with our Refund Policy. Please review that policy for full details on eligibility and the refund process.
              </p>
            </div>

            {/* No Legal Advice */}
            <div ref={(el) => { sectionRefs.current[6] = el; }} data-index={6} id={sections[6].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>No Legal Advice</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We are not a law firm, immigration lawyer, or registered migration agent (except where explicitly stated and licensed to provide such services). Nothing on our Website or provided as part of our Services constitutes legal or immigration advice. If you require legal advice regarding your immigration status, eligibility, or individual circumstances, we recommend consulting a qualified immigration lawyer or the relevant government authority directly.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div ref={(el) => { sectionRefs.current[7] = el; }} data-index={7} id={sections[7].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Limitation of Liability</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>To the maximum extent permitted by law:</p>
              <BulletList items={[
                "We are not liable for any application refusal, rejection, delay, or denial of entry made by a government authority",
                "We are not liable for indirect, incidental, or consequential losses, including missed flights, cancelled bookings, or travel disruption resulting from application outcomes or processing times",
                "Our total liability for any claim arising from use of our Services is limited to the amount of fees you paid to us for the relevant application",
              ]} />
            </div>

            {/* Intellectual Property */}
            <div ref={(el) => { sectionRefs.current[8] = el; }} data-index={8} id={sections[8].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Intellectual Property</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                All content on this Website, including text, graphics, logos, and design, is the property of Evisaeta or its licensors and is protected by applicable intellectual property laws. You may not copy, reproduce, or distribute any part of this Website without our prior written consent.
              </p>
            </div>

            {/* Website Use */}
            <div ref={(el) => { sectionRefs.current[9] = el; }} data-index={9} id={sections[9].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Website Use</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>You agree not to:</p>
              <BulletList items={[
                "Use the Website for any unlawful purpose",
                "Submit false, fraudulent, or misleading information",
                "Attempt to interfere with the security or proper functioning of the Website",
                "Use automated systems (e.g. bots or scrapers) to access the Website without our permission",
              ]} />
            </div>

            {/* Third-Party Links */}
            <div ref={(el) => { sectionRefs.current[10] = el; }} data-index={10} id={sections[10].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Third-Party Links</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                Our Website may contain links to third-party websites, including official government portals, for your convenience. We do not control and are not responsible for the content, accuracy, or practices of these external websites.
              </p>
            </div>

            {/* Changes to These Terms */}
            <div ref={(el) => { sectionRefs.current[11] = el; }} data-index={11} id={sections[11].id}>
              <h2 className="md:!text-[24px]" style={{ ...headingStyle, marginTop: "24px" }}>Changes to These Terms</h2>
              <p style={{ ...bodyStyle, marginTop: "8px" }}>
                We may update these Terms from time to time. Changes will be posted on this page with a revised &quot;Last updated&quot; date. Continued use of our Website or Services after changes are posted constitutes your acceptance of the updated Terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import about from "@/images/about.svg";

interface ApplicationData {
  applicationId: string;
  status: string;
  payment: boolean;
  submitDate: string;
  applicationReceived: boolean;
  underReview: boolean;
  finalDecision: boolean;
}

const applicationsData: ApplicationData[] = [
  {
    applicationId: "EVA-98AY73",
    status: "Incomplete",
    payment: true,
    submitDate: "09/08/2026",
    applicationReceived: true,
    underReview: false,
    finalDecision: false,
  },
];

export default function TrackStatusPage() {
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<ApplicationData | null>(null);

  const handleTrack = () => {
    setShowResult(true);
    setResultData(applicationsData[0]);
  };

  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px]" style={{ height: "245px" }}>
          <Image src={about} alt="Track Status" fill className="object-cover" style={{ borderRadius: "16px" }} priority />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <button className="flex items-center justify-center rounded-full" style={{ width: "127px", height: "40px", gap: "16px", background: "transparent", border: "1px solid #FFFFFF", color: "#FFFFFF" }}>
              Track Status
            </button>
            <div style={{ maxWidth: "697px", marginTop: "16px" }}>
              <h1 className="text-white text-center md:!text-[56px] md:!leading-[110%] md:!tracking-[-0.03em]" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "135%", letterSpacing: "-0.02em", textAlign: "center" }}>
                Track Your Application
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="mx-auto" style={{ maxWidth: "666px", textAlign: "center" }}>
          <h2 className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "120%", letterSpacing: "-0.03em", color: "#0F0F0F", textAlign: "center" }}>
            Check Your Visa Status
          </h2>
          <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "#575757", textAlign: "center", marginTop: "16px" }}>
            Enter your reference number and email address to check the current status of your visa application.
          </p>

          {/* Form card */}
          <div style={{ marginTop: "24px", border: "1px solid #D9D9D9", borderRadius: "24px", padding: "24px", background: "#FAFAF9", display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            {/* Reference Number */}
            <div>
              <label style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                Reference Number
              </label>
              <input
                type="text"
                placeholder="e.g. EVA-123456"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "56px",
                  borderRadius: "999px",
                  border: "1px solid #D9D9D9",
                  padding: "16px",
                  background: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "#0F0F0F",
                }}
              />
            </div>

            {/* Email Address */}
            <div>
              <label style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                Email Address <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="email"
                placeholder="evisaeta@gmail.com"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "56px",
                  borderRadius: "999px",
                  border: "1px solid #D9D9D9",
                  padding: "16px",
                  background: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "#0F0F0F",
                }}
              />
              <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "165%", letterSpacing: "0em", color: "#575757", marginTop: "8px" }}>
                The email used in your application
              </p>
            </div>

            {/* Track Status button */}
            <button
              onClick={handleTrack}
              className="flex items-center justify-center w-full"
              style={{
                height: "48px",
                gap: "8px",
                borderRadius: "999px",
                background: "var(--primary)",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
              }}
            >
              Track Status
              <ArrowRight style={{ width: "20px", height: "20px" }} />
            </button>
          </div>

          {/* Result section */}
          {showResult && resultData && (
            <div style={{ marginTop: "24px", border: "1px solid #D9D9D9", borderRadius: "16px", padding: "16px", background: "#FFFFFF", textAlign: "left" }}>
              {/* Top row: Application ID (left) + Status (right) */}
              <div className="flex justify-between" style={{ gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757" }}>
                    Application ID:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                    {resultData.applicationId}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757" }}>
                    Status:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                    {resultData.status}
                  </p>
                </div>
              </div>

              {/* Bottom row: Submit Date (left) + Payment (right) */}
              <div className="flex justify-between" style={{ gap: "16px", marginTop: "16px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757" }}>
                    Submit Date:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                    {resultData.submitDate}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757" }}>
                    Payment:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#28806F", marginTop: "4px" }}>
                    {resultData.payment ? "Paid" : "Unpaid"}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "#D9D9D9", margin: "24px 0" }} />

              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Step 1: Application Received */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: "#28806F", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check style={{ width: "18px", height: "18px", color: "#FFFFFF" }} />
                    </div>
                    <div style={{ width: "2px", flex: 1, minHeight: "48px", background: resultData.underReview ? "#28806F" : "#D9D9D9", marginTop: "4px" }} />
                  </div>
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                      Application Received
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757", marginTop: "4px" }}>
                      We&apos;ve successfully received your details and documents.
                    </p>
                  </div>
                </div>

                {/* Step 2: Under Review */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: resultData.underReview ? "#28806F" : "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {resultData.underReview && <Check style={{ width: "18px", height: "18px", color: "#FFFFFF" }} />}
                    </div>
                    <div style={{ width: "2px", flex: 1, minHeight: "48px", background: resultData.finalDecision ? "#28806F" : "#D9D9D9", marginTop: "4px" }} />
                  </div>
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                      Under Review
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757", marginTop: "4px" }}>
                      Your documents are being verified by our visa specialists.
                    </p>
                  </div>
                </div>

                {/* Step 3: Final Decision */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: resultData.finalDecision ? "#28806F" : "#D9D9D9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {resultData.finalDecision && <Check style={{ width: "18px", height: "18px", color: "#FFFFFF" }} />}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                      Final Decision
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#575757", marginTop: "4px" }}>
                      You will receive your visa document via email once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

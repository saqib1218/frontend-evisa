"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import about from "@/images/about.svg";
import { api } from "@/utils/api";
import { useToast, ToastContainer } from "@/utils/toast";

interface TrackResult {
  applicantId: string;
  status: string;
  payment: boolean;
  submitDate: string;
  adminNotes: string | null;
  applicationReceived: boolean;
  underReview: boolean;
  finalDecision: boolean;
}

export default function TrackStatusPage() {
  const [applicantId, setApplicantId] = useState("");
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<TrackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const handleTrack = async () => {
    if (!applicantId.trim() || !email.trim()) {
      showToast("Please enter both Applicant ID and Email Address", "error");
      return;
    }

    setLoading(true);
    setShowResult(false);
    setResultData(null);

    try {
      const data = await api.trackApplication(applicantId.trim(), email.trim());

      const status = data.status || "pending";
      const paymentStatus = data.payment?.payment_status ?? false;
      const submitDate = data.submit_date
        ? new Date(data.submit_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-";

      const applicationReceived = ["pending", "inprogress", "accepted", "rejected"].includes(status);
      const underReview = ["inprogress", "accepted", "rejected"].includes(status);
      const finalDecision = ["accepted", "rejected"].includes(status);

      setResultData({
        applicantId: data.applicant_id,
        status: status.charAt(0).toUpperCase() + status.slice(1),
        payment: paymentStatus,
        submitDate,
        adminNotes: data.admin_notes || null,
        applicationReceived,
        underReview,
        finalDecision,
      });
      setShowResult(true);
    } catch (err: any) {
      showToast("Application does not exist. Please check your Applicant ID and email.", "error");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "var(--success-text)";
      case "rejected":
        return "#DC2626";
      case "inprogress":
        return "#2563EB";
      case "pending":
        return "#F59E0B";
      default:
        return "var(--text-heading)";
    }
  };

  return (
    <main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "245px" }}>
          <Image src={about} alt="Track Status" fill className="object-cover" style={{ borderRadius: "16px" }} priority sizes="(max-width: 768px) 100vw, 1408px" loading="eager" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <button className="flex items-center justify-center rounded-full" style={{ width: "127px", height: "40px", gap: "16px", background: "transparent", border: "1px solid var(--hero-text)", color: "var(--hero-text)" }}>
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
          <h2 className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "120%", letterSpacing: "-0.03em", color: "var(--text-heading)", textAlign: "center" }}>
            Check Your Visa Status
          </h2>
          <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-body)", textAlign: "center", marginTop: "16px" }}>
            Enter your Applicant ID and email address to check the current status of your visa application.
          </p>

          {/* Form card */}
          <div style={{ marginTop: "24px", border: "1px solid var(--form-border)", borderRadius: "24px", padding: "24px", background: "var(--form-bg)", display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            {/* Applicant ID */}
            <div>
              <label style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                Applicant ID
              </label>
              <input
                type="text"
                value={applicantId}
                onChange={(e) => setApplicantId(e.target.value)}
                placeholder="e.g. ALGS-98034"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "56px",
                  borderRadius: "999px",
                  border: "1px solid var(--form-border)",
                  padding: "16px",
                  background: "var(--input-bg)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--text-heading)",
                }}
              />
            </div>

            {/* Email Address */}
            <div>
              <label style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                Email Address <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="evisaeta@gmail.com"
                style={{
                  marginTop: "8px",
                  width: "100%",
                  height: "56px",
                  borderRadius: "999px",
                  border: "1px solid var(--form-border)",
                  padding: "16px",
                  background: "var(--input-bg)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--text-heading)",
                }}
              />
              <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "165%", letterSpacing: "0em", color: "var(--text-body)", marginTop: "8px" }}>
                The email used in your application
              </p>
            </div>

            {/* Track Status button */}
            <button
              onClick={handleTrack}
              disabled={loading}
              className="flex items-center justify-center w-full"
              style={{
                height: "48px",
                gap: "8px",
                borderRadius: "999px",
                background: loading ? "var(--form-border)" : "var(--primary)",
                color: "var(--hero-text)",
                fontSize: "16px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              {loading ? "Searching..." : "Track Status"}
              <ArrowRight style={{ width: "20px", height: "20px" }} />
            </button>
          </div>

          {/* Result section */}
          {showResult && resultData && (
            <div style={{ marginTop: "24px", border: "1px solid var(--form-border)", borderRadius: "16px", padding: "16px", background: "var(--input-bg)", textAlign: "left" }}>
              {/* Top row: Application ID (left) + Status (right) */}
              <div className="flex justify-between" style={{ gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)" }}>
                    Application ID:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>
                    {resultData.applicantId}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)" }}>
                    Status:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: statusColor(resultData.status), marginTop: "4px" }}>
                    {resultData.status}
                  </p>
                </div>
              </div>

              {/* Bottom row: Submit Date (left) + Payment (right) */}
              <div className="flex justify-between" style={{ gap: "16px", marginTop: "16px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)" }}>
                    Submit Date:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>
                    {resultData.submitDate}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)" }}>
                    Payment:
                  </p>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: resultData.payment ? "var(--success-text)" : "#F97316", marginTop: "4px" }}>
                    {resultData.payment ? "Paid" : "Unpaid"}
                  </p>
                </div>
              </div>

              {/* Admin notes */}
              {resultData.adminNotes && (
                <div style={{ marginTop: "16px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "160%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "4px" }}>
                    {resultData.adminNotes}
                  </p>
                </div>
              )}

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--form-border)", margin: "24px 0" }} />

              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Step 1: Application Received */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: resultData.applicationReceived ? "var(--success-text)" : "var(--form-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                      {resultData.applicationReceived && <Check style={{ width: "18px", height: "18px", color: "var(--hero-text)" }} />}
                    </div>
                    <div style={{ width: "2px", flex: 1, minHeight: "48px", background: resultData.underReview ? "var(--success-text)" : "var(--form-border)", marginTop: "4px", transition: "background 0.3s" }} />
                  </div>
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                      Application Received
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)", marginTop: "4px" }}>
                      We&apos;ve successfully received your details and documents.
                    </p>
                  </div>
                </div>

                {/* Step 2: Under Review */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: resultData.underReview ? "var(--success-text)" : "var(--form-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                      {resultData.underReview && <Check style={{ width: "18px", height: "18px", color: "var(--hero-text)" }} />}
                    </div>
                    <div style={{ width: "2px", flex: 1, minHeight: "48px", background: resultData.finalDecision ? "var(--success-text)" : "var(--form-border)", marginTop: "4px", transition: "background 0.3s" }} />
                  </div>
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                      Under Review
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)", marginTop: "4px" }}>
                      Your documents are being verified by our visa specialists.
                    </p>
                  </div>
                </div>

                {/* Step 3: Final Decision */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: resultData.finalDecision ? "var(--success-text)" : "var(--form-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s" }}>
                      {resultData.finalDecision && <Check style={{ width: "18px", height: "18px", color: "var(--hero-text)" }} />}
                    </div>
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                      Final Decision
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--text-body)", marginTop: "4px" }}>
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

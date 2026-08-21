"use client";

import { Check, X, ArrowRight } from "lucide-react";

interface SuccessModalProps {
  applicantId: string;
  referenceNumber: string;
  onClose: () => void;
}

export default function SuccessModal({ applicantId, referenceNumber, onClose }: SuccessModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "var(--card)",
          borderRadius: "24px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Top row: close button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center" style={{ gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--success-text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check style={{ width: "24px", height: "24px", color: "var(--hero-text)" }} />
            </div>
            <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
              Application Submitted!
            </p>
          </div>
          <X
            style={{ width: "24px", height: "24px", color: "var(--placeholder-text)", cursor: "pointer", flexShrink: 0 }}
            onClick={onClose}
          />
        </div>

        {/* Description */}
        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
          Your application has been received. Save your Applicant ID to track your status.
        </p>

        {/* Applicant ID + Reference */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "180px", padding: "16px", borderRadius: "16px", background: "var(--accent-bg)" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-body)" }}>Applicant ID</p>
            <p style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-heading)", marginTop: "4px" }}>{applicantId}</p>
          </div>
          <div style={{ flex: 1, minWidth: "180px", padding: "16px", borderRadius: "16px", background: "var(--accent-bg)" }}>
            <p style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-body)" }}>Reference Number</p>
            <p style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-heading)", marginTop: "4px" }}>{referenceNumber}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end" style={{ gap: "16px" }}>
          <button
            onClick={onClose}
            className="flex items-center justify-center"
            style={{
              height: "48px",
              gap: "8px",
              borderRadius: "999px",
              paddingTop: "12px",
              paddingRight: "20px",
              paddingBottom: "12px",
              paddingLeft: "20px",
              border: "1px solid var(--form-border)",
              background: "var(--card)",
              color: "var(--primary)",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <a
            href="/track-status"
            className="flex items-center justify-center"
            style={{
              height: "48px",
              gap: "8px",
              borderRadius: "999px",
              paddingTop: "12px",
              paddingRight: "20px",
              paddingBottom: "12px",
              paddingLeft: "20px",
              background: "var(--primary)",
              color: "var(--hero-text)",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Track Application
            <ArrowRight style={{ width: "20px", height: "20px" }} />
          </a>
        </div>
      </div>
    </div>
  );
}

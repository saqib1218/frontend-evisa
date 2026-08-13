"use client";

import { Trash2, X } from "lucide-react";

interface DeleteModalProps {
  applicantName: string;
  onKeep: () => void;
  onRemove: () => void;
}

export default function DeleteModal({ applicantName, onKeep, onRemove }: DeleteModalProps) {
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
      onClick={onKeep}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "white",
          borderRadius: "24px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Top row: delete icon + title + close */}
        <div className="flex items-start justify-between">
          <div className="flex items-center" style={{ gap: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                background: "#FEEFF2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Trash2 style={{ width: "20px", height: "20px", color: "#DF1C41" }} />
            </div>
            <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#DF1C41" }}>
              Remove {applicantName}?
            </p>
          </div>
          <X
            style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer", flexShrink: 0 }}
            onClick={onKeep}
          />
        </div>

        {/* Description */}
        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
          This will permanently delete all application details entered for this applicant. You&apos;ll need to re-enter their information if you add them again.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-end" style={{ gap: "16px" }}>
          <button
            onClick={onKeep}
            className="flex items-center justify-center"
            style={{
              height: "48px",
              gap: "8px",
              borderRadius: "999px",
              paddingTop: "12px",
              paddingRight: "20px",
              paddingBottom: "12px",
              paddingLeft: "20px",
              border: "1px solid #D9D9D9",
              background: "white",
              color: "#2D76B5",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Keep applicant
          </button>
          <button
            onClick={onRemove}
            className="flex items-center justify-center"
            style={{
              height: "48px",
              gap: "8px",
              borderRadius: "999px",
              paddingTop: "12px",
              paddingRight: "20px",
              paddingBottom: "12px",
              paddingLeft: "20px",
              background: "#DF1C41",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Remove Applicant
          </button>
        </div>
      </div>
    </div>
  );
}

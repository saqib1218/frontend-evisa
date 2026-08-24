"use client";

import { X, ArrowLeft } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto px-4" style={{ maxWidth: "600px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          background: "var(--card)",
          borderRadius: "24px",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#FDE8E8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X style={{ width: "32px", height: "32px", color: "#DF1C41" }} />
        </div>
        <p style={{ fontSize: "24px", fontWeight: 500, color: "var(--text-heading)" }}>Payment Cancelled</p>
        <p style={{ fontSize: "16px", color: "var(--text-body)" }}>
          You cancelled the payment process. No charges were applied and your application was not submitted. You can return to the application form to try again.
        </p>
        <a
          href="/apply"
          className="flex items-center justify-center"
          style={{
            height: "48px",
            gap: "8px",
            borderRadius: "999px",
            padding: "12px 24px",
            background: "var(--primary)",
            color: "var(--hero-text)",
            fontSize: "16px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <ArrowLeft style={{ width: "20px", height: "20px" }} />
          Return to Application
        </a>
      </div>
    </main>
  );
}

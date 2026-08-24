"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import { api } from "@/utils/api";
import SuccessModal from "@/app/apply/Models/SuccessModal/SuccessModal";

type PaymentState = "checking" | "paid" | "pending" | "failed" | "error";

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 10;

function ModalShell({ children }: { children: React.ReactNode }) {
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
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          margin: "0 16px",
          background: "var(--card)",
          borderRadius: "24px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [state, setState] = useState<PaymentState>("checking");
  const [applicantId, setApplicantId] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (!sessionId) {
      setState("error");
      return;
    }

    let cancelled = false;

    const poll = async () => {
      try {
        const result = await api.getPaymentStatus(sessionId);
        if (cancelled) return;

        if (result.status === "paid") {
          setApplicantId(result.applicantId || null);
          setReferenceNumber(result.referenceNumber || null);
          setState("paid");
          return;
        }

        if (result.status === "failed") {
          setState("failed");
          return;
        }

        // Still pending — the webhook may not have arrived yet. Poll again.
        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_POLL_ATTEMPTS) {
          setState("pending");
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
      } catch (err) {
        if (!cancelled) setState("error");
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (state === "paid") {
    return (
      <SuccessModal
        applicantId={applicantId || ""}
        referenceNumber={referenceNumber || ""}
        onClose={() => router.push("/")}
      />
    );
  }

  return (
    <main style={{ minHeight: "60vh" }}>
      <ModalShell>
        {state === "checking" && (
          <>
            <Loader2 style={{ width: "48px", height: "48px", color: "var(--primary)" }} className="animate-spin" />
            <p style={{ fontSize: "20px", fontWeight: 500, color: "var(--text-heading)" }}>Confirming your payment...</p>
            <p style={{ fontSize: "16px", color: "var(--text-body)" }}>Please wait, this only takes a moment.</p>
          </>
        )}

        {state === "pending" && (
          <>
            <Loader2 style={{ width: "48px", height: "48px", color: "var(--primary)" }} />
            <p style={{ fontSize: "20px", fontWeight: 500, color: "var(--text-heading)" }}>Payment still processing</p>
            <p style={{ fontSize: "16px", color: "var(--text-body)" }}>
              We&apos;re still confirming your payment with Stripe. This can take a few minutes — please check back shortly or contact support if this persists.
            </p>
          </>
        )}

        {(state === "failed" || state === "error") && (
          <>
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
            <p style={{ fontSize: "20px", fontWeight: 500, color: "var(--text-heading)" }}>
              {state === "failed" ? "Payment was not completed" : "Unable to verify payment"}
            </p>
            <p style={{ fontSize: "16px", color: "var(--text-body)" }}>
              {state === "failed"
                ? "Your payment could not be confirmed. No charges were applied and your application was not submitted."
                : "We couldn't verify this payment session. If you completed payment, please contact support with your session details."}
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
              Try Again
            </a>
          </>
        )}
      </ModalShell>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

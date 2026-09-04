import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
      <span
        style={{
          fontSize: "120px",
          fontWeight: 500,
          lineHeight: "100%",
          letterSpacing: "-0.03em",
          color: "var(--primary)",
        }}
      >
        404
      </span>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 500,
          lineHeight: "135%",
          letterSpacing: "-0.02em",
          color: "var(--text-heading)",
          textAlign: "center",
          marginTop: "16px",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "150%",
          letterSpacing: "-0.01em",
          color: "var(--muted)",
          textAlign: "center",
          maxWidth: "480px",
          marginTop: "12px",
        }}
      >
        The page you are looking for doesn&apos;t exist or has been moved. Please return to the homepage to continue your UK ETA application.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
        style={{
          height: "48px",
          paddingTop: "12px",
          paddingRight: "24px",
          paddingBottom: "12px",
          paddingLeft: "24px",
          marginTop: "32px",
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        Back to Homepage
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

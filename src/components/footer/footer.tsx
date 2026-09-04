import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import logo from "@/images/logo.svg";

const stats = [
  { value: "10,000+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Approval Rate" },
  { value: "24/7", label: "Support" },
];

const generalLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
const applicationLinks = [
  { label: "UK ETA Application", href: "/apply" },
  { label: "Check Application Status", href: "/track-status" },
];
const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Migration Rules & Disclaimer", href: "/migration-rules" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Stats bar */}
      <div className="w-full bg-primary">
      <div
        className="mx-auto px-4 py-10 md:px-10 md:py-10"
        style={{ maxWidth: "1440px" }}
      >
        {/* Mobile: 2x2 grid with gapped dividers (no plus-sign overlap) */}
        <div className="grid md:hidden" style={{ gridTemplateColumns: "1fr 1px 1fr", gridTemplateRows: "1fr 1px 1fr" }}>
          {/* Row 1 */}
          <div className="flex flex-col items-center justify-center text-center" style={{ padding: "16px 24px" }}>
            <span className="text-white" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "135%", letterSpacing: "-0.02em" }}>
              {stats[0].value}
            </span>
            <span className="mt-1 text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
              {stats[0].label}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div style={{ width: "1px", height: "56px", backgroundColor: "var(--hero-text)" }} />
          </div>
          <div className="flex flex-col items-center justify-center text-center" style={{ padding: "16px 24px" }}>
            <span className="text-white" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "135%", letterSpacing: "-0.02em" }}>
              {stats[1].value}
            </span>
            <span className="mt-1 text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
              {stats[1].label}
            </span>
          </div>

          {/* Divider row */}
          <div className="flex items-center justify-start">
            <div style={{ height: "1px", backgroundColor: "var(--hero-text)", width: "calc(100% - 24px)" }} />
          </div>
          <div />
          <div className="flex items-center justify-end">
            <div style={{ height: "1px", backgroundColor: "var(--hero-text)", width: "calc(100% - 24px)" }} />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col items-center justify-center text-center" style={{ padding: "16px 24px" }}>
            <span className="text-white" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "135%", letterSpacing: "-0.02em" }}>
              {stats[2].value}
            </span>
            <span className="mt-1 text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
              {stats[2].label}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div style={{ width: "1px", height: "56px", backgroundColor: "var(--hero-text)" }} />
          </div>
          <div className="flex flex-col items-center justify-center text-center" style={{ padding: "16px 24px" }}>
            <span className="text-white" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "135%", letterSpacing: "-0.02em" }}>
              {stats[3].value}
            </span>
            <span className="mt-1 text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
              {stats[3].label}
            </span>
          </div>
        </div>

        {/* Desktop: flex row with dividers */}
        <div className="hidden md:flex md:items-center md:justify-center" style={{ gap: "120px" }}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center" style={{ gap: "120px" }}>
              <div className="flex flex-col items-center text-center">
                <span className="text-white" style={{ fontSize: "48px", fontWeight: 500, lineHeight: "120%", letterSpacing: "-0.03em" }}>
                  {stat.value}
                </span>
                <span className="mt-1 text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
                  {stat.label}
                </span>
              </div>
              {index < stats.length - 1 && (
                <div style={{ width: "1px", height: "56px", backgroundColor: "var(--hero-text)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Main footer content */}
      <div className="w-full" style={{ background: "var(--form-bg)" }}>
      <div
        className="mx-auto px-4 py-8 md:px-10 md:py-8"
        style={{ maxWidth: "1440px" }}
      >
        <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
          {/* Column 1: Logo + description + button */}
          <div className="flex flex-col" style={{ gap: "16px", width: "100%" }}>
            <Image
              src={logo}
              alt="Evisa logo"
              width={115}
              height={60}
            />
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.01em",
                color: "var(--muted-foreground)",
                maxWidth: "280px",
              }}
            >
              Your trusted partner for ETA and visa applications.
            </p>
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover md:w-auto"
              style={{
                width: "100%",
                height: "48px",
                paddingTop: "12px",
                paddingRight: "20px",
                paddingBottom: "12px",
                paddingLeft: "20px",
              }}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Column 2: General */}
          <div className="flex flex-col" style={{ gap: "16px", width: "100%" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
              }}
            >
              General
            </h3>
            {generalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:!text-primary cursor-pointer text-[var(--muted-foreground)]"
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Application */}
          <div className="flex flex-col" style={{ gap: "16px", width: "100%" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
              }}
            >
              Application
            </h3>
            {applicationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:!text-primary cursor-pointer text-[var(--muted-foreground)]"
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Policy Information */}
          <div className="flex flex-col" style={{ gap: "16px", width: "100%" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
              }}
            >
              Policy Information
            </h3>
            {policyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:!text-primary cursor-pointer text-[var(--muted-foreground)]"
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div
          className="mx-auto bg-primary"
          style={{ maxWidth: "1360px", height: "1px", marginTop: "32px" }}
        />

        {/* Copyright text */}
        <p
          className="text-center"
          style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "150%",
            letterSpacing: "-0.01em",
            color: "var(--muted-foreground)",
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          Copyright © 2026 evisaeta.co.uk, All rights reserved.
        </p>
      </div>
      </div>

      {/* Powered by bar */}
      <div className="w-full bg-primary">
      <div
        className="mx-auto flex items-center justify-center"
        style={{ maxWidth: "1440px", paddingTop: "16px", paddingBottom: "16px" }}
      >
        <span
          className="text-white text-center"
          style={{
            fontSize: "16px",
            lineHeight: "150%",
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ fontWeight: 400 }}>Powered by </span>
          <span style={{ fontWeight: 700 }}>Design Dundies</span>
        </span>
      </div>
      </div>
    </footer>
  );
}

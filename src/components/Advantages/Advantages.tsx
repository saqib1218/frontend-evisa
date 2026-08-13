import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import trueIcon from "@/images/true.svg";
import falseIcon from "@/images/false.svg";

const tableData = [
  { feature: "Secure document upload & payment", evisaeta: true, government: true },
  { feature: "Clear status tracking & email updates", evisaeta: true, government: false },
  { feature: "Expert review before submission", evisaeta: true, government: false },
  { feature: "Help from real people around the clock", evisaeta: true, government: false },
  { feature: "Save and resume anytime", evisaeta: true, government: false },
];

export default function Advantages() {
  return (
    <div className="mx-auto px-4 md:px-10" style={{ maxWidth: "1440px" }}>
      {/* Desktop: text left, button right */}
      <div className="hidden md:flex md:items-end md:justify-between">
        <div className="flex flex-col" style={{ maxWidth: "752px", gap: "32px" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 500,
              lineHeight: "120%",
              letterSpacing: "-0.03em",
              color: "#0F0F0F",
            }}
          >
            Advantages of Applying Through Our Service
          </h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "-0.02em",
              color: "var(--muted)",
            }}
          >
            A single mistake can delay or derail your application. Our specialists review every submission to help you get it right the first time.
          </p>
        </div>
        <Link
          href="/apply"
          className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
          style={{
            width: "226px",
            height: "48px",
            paddingTop: "12px",
            paddingRight: "20px",
            paddingBottom: "12px",
            paddingLeft: "20px",
            flexShrink: 0,
          }}
        >
          Start My Application
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Mobile: centered text + full width button */}
      <div className="flex flex-col items-center md:hidden">
        <h2
          className="text-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "135%",
            letterSpacing: "-0.02em",
            color: "#0F0F0F",
          }}
        >
          Advantages of Applying Through Our Service
        </h2>
        <p
          className="text-center mt-4"
          style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "150%",
            letterSpacing: "-0.01em",
            color: "var(--muted)",
          }}
        >
          A single mistake can delay or derail your application. Our specialists review every submission to help you get it right the first time.
        </p>
        <Link
          href="/apply"
          className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full mt-6"
          style={{
            height: "48px",
            paddingTop: "12px",
            paddingRight: "20px",
            paddingBottom: "12px",
            paddingLeft: "20px",
          }}
        >
          Start My Application
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Desktop Table */}
      <div
        className="mt-8 hidden md:block overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "1360px",
          borderRadius: "12px",
          border: "1px solid #D9D9D9",
        }}
      >
        {/* Header */}
        <div
          className="flex bg-primary"
          style={{
            gap: "96px",
            padding: "24px",
            height: "80px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <span className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              Features
            </span>
          </div>
          <div style={{ width: "120px", textAlign: "center" }}>
            <span className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              Evisaeta
            </span>
          </div>
          <div style={{ width: "120px", textAlign: "center" }}>
            <span className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              Government Portals
            </span>
          </div>
        </div>

        {/* Data rows */}
        {tableData.map((row, index) => (
          <div
            key={index}
            className="flex"
            style={{
              gap: "96px",
              paddingTop: "16px",
              paddingRight: "24px",
              paddingBottom: "16px",
              paddingLeft: "24px",
              borderBottom: index < tableData.length - 1 ? "1px solid #D9D9D9" : "none",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "#353535",
                }}
              >
                {row.feature}
              </span>
            </div>
            <div style={{ width: "120px", display: "flex", justifyContent: "center" }}>
              <Image src={trueIcon} alt="True" width={24} height={24} style={{ width: "24px", height: "24px" }} />
            </div>
            <div style={{ width: "120px", display: "flex", justifyContent: "center" }}>
              <Image
                src={row.government ? trueIcon : falseIcon}
                alt={row.government ? "True" : "False"}
                width={24}
                height={24}
                style={{ width: "24px", height: "24px" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Table */}
      <div
        className="mt-6 md:hidden overflow-hidden"
        style={{
          borderRadius: "12px",
          border: "1px solid #D9D9D9",
        }}
      >
        {/* Header: only Evisaeta and Government Portals */}
        <div
          className="flex bg-primary"
          style={{
            padding: "16px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>
            <span className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              Evisaeta
            </span>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              Government Portals
            </span>
          </div>
        </div>

        {/* Mobile data rows: feature text + two icons */}
        {tableData.map((row, index) => (
          <div
            key={index}
            className="flex flex-col"
            style={{
              paddingTop: "16px",
              paddingRight: "16px",
              paddingBottom: "16px",
              paddingLeft: "16px",
              borderBottom: index < tableData.length - 1 ? "1px solid #D9D9D9" : "none",
            }}
          >
            <div className="flex">
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image src={trueIcon} alt="True" width={24} height={24} style={{ width: "24px", height: "24px" }} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image
                  src={row.government ? trueIcon : falseIcon}
                  alt={row.government ? "True" : "False"}
                  width={24}
                  height={24}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 400, color: "#353535", marginTop: "8px", textAlign: "center" }}>
              {row.feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

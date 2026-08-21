import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import homebg from "@/images/homebg.svg";
import im1 from "@/images/im1.svg";
import img2 from "@/images/img2.svg";
import img3 from "@/images/img3.svg";
import img4 from "@/images/img4.svg";
import image18 from "@/images/image18.svg";
import tick from "@/images/tick.svg";
import cancel from "@/images/cancel.svg";
import Applycard from "@/components/Applycard/Applycard";
import Advantages from "@/components/Advantages/Advantages";
import FAQ from "@/components/FAQ/faq";
import Ready from "@/components/Ready/Ready";

const rightItems = [
  { num: "01", img: im1, title: "Why you need a UK eTA", desc: "Applying for your UK eTA takes just a few minutes. Answer a short guided questionnaire, let us review your details, and get your travel authorization approved, often within 15 minutes." },
  { num: "02", img: img2, title: "Complete the online form", desc: "A quick, step-by-step questionnaire that guides you through each requirement. Takes about five minutes." },
  { num: "03", img: img3, title: "Get approved fast", desc: "Perfect for holidays, business trips, or visiting family and for stays up to 6 months." },
  { num: "04", img: img4, title: "Valid for 2 years", desc: "Your UK eTA is valid for 2 years or until your passport expires." },
];

export default function Home() {
  return (
    <main>
      {/* Hero section */}
      <div className="mx-auto max-w-[1408px] px-4 md:px-0 md:py-0">
        <div className="relative w-full hero-image-container" style={{ height: "844px" }}>
          <Image
            src={homebg}
            alt="Home background"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="100vw"
            loading="eager"
          />
          {/* Desktop: left-aligned text + right apply card */}
          <div className="absolute inset-0 hidden md:flex md:items-center">
            <div className="ml-6 max-w-[666px]">
              <h1
                className="text-background"
                style={{ fontSize: "64px", fontWeight: 500, lineHeight: "110%", letterSpacing: "-0.03em", color: "var(--hero-text)" }}
              >
                Get Your UK eTA In Few <br />
                Easy Steps
              </h1>
              <p
                className="mt-4"
                style={{ fontSize: "18px", fontWeight: 400, color: "var(--hero-text)" }}
              >
                Fast, guided applications for Canada, the USA, Australia, New
                Zealand and the UK reviewed by our specialists before
                submission.
              </p>
            </div>
          </div>
          <div
            className="absolute hidden md:block"
            style={{ top: "213px", right: "24px" }}
          >
            <Applycard />
          </div>

          {/* Mobile: centered text + apply card below */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:hidden">
            <h1
              className="text-background text-center"
              style={{ fontSize: "40px", fontWeight: 500, lineHeight: "130%", letterSpacing: "-0.03em", textAlign: "center", color: "var(--hero-text)" }}
            >
              Get Your UK eTA In Few Easy Steps
            </h1>
            <p
              className="mt-4 text-center"
              style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--hero-text)", maxWidth: "320px", textAlign: "center" }}
            >
              Fast, guided applications for Canada, the USA, Australia, New Zealand and the UK reviewed by our specialists before submission.
            </p>
            <div className="mt-6 w-full flex justify-center">
              <Applycard />
            </div>
          </div>
        </div>
      </div>

      {/* How UK eTA works section */}
      <div className="mx-auto px-4 md:px-10" style={{ maxWidth: "1440px" }}>
        <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
          {/* Left side */}
          <div className="md:!pt-[120px] md:sticky md:top-0" style={{ paddingTop: "48px", height: "fit-content", alignSelf: "flex-start" }}>
            <div className="flex flex-col" style={{ maxWidth: "752px", gap: "8px" }}>
              <h2
                className="text-center md:text-left"
                style={{
                  fontSize: "32px",
                  fontWeight: 500,
                  lineHeight: "135%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                }}
              >
                <span className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]">How the UK eTA works</span>
              </h2>
              <p
                className="text-center md:text-left"
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--muted)",
                }}
              >
                Applying for your UK eTA takes just a few minutes. Answer a short guided questionnaire, let our specialists review your details, and get your travel authorization approved, often within 15 minutes.
              </p>
            </div>
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full md:w-auto md:!max-w-[159px] md:mx-0"
              style={{
                height: "48px",
                marginTop: "32px",
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

          {/* Right side */}
          <div className="md:!pt-[120px]" style={{ paddingTop: "48px", flex: 1 }}>
            {rightItems.map((item, index) => (
              <div key={item.num} className="flex" style={{ gap: "24px" }}>
                {/* Left: number + vertical divider */}
                <div className="flex flex-col items-center">
                  <span
                    className="md:!text-[64px] md:!leading-[100%]"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontSize: "40px",
                      fontWeight: 300,
                      lineHeight: "130%",
                      letterSpacing: "-0.02em",
                      textAlign: "center",
                      color: "var(--primary)",
                      WebkitTextStroke: "2px var(--primary)",
                    }}
                  >
                    {item.num}
                  </span>
                  {index < rightItems.length - 1 && (
                    <div
                      style={{
                        width: "4px",
                        flex: 1,
                        backgroundColor: "var(--primary)",
                        minHeight: "0",
                      }}
                    />
                  )}
                </div>

                {/* Right: text + image */}
                <div className="flex flex-col" style={{ flex: 1, paddingBottom: index < rightItems.length - 1 ? "52px" : "0" }}>
                  <div className="flex flex-col" style={{ gap: "8px" }}>
                    <h3
                      className="md:!text-[24px]"
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        lineHeight: "140%",
                        letterSpacing: "-0.02em",
                        color: "var(--general)",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "150%",
                        letterSpacing: "-0.01em",
                        color: "var(--muted)",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div style={{ marginTop: "24px" }}>
                    <Image
                      src={item.img}
                      alt={`Step ${item.num}`}
                      width={470}
                      height={200}
                      style={{ width: "100%", maxWidth: "470px", height: "auto", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who needs to apply section */}
      <div className="mx-auto px-4 md:!pt-[120px] md:!pb-[120px] md:!px-10" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="mx-auto px-4 md:!pt-[72px] md:!pb-[72px] md:!px-10" style={{ maxWidth: "1360px", paddingTop: "32px", paddingBottom: "32px", borderRadius: "16px", border: "1px solid var(--form-border)", background: "var(--form-bg)" }}>
          {/* Heading + description */}
          <div className="mx-auto flex flex-col items-center" style={{ maxWidth: "711px", gap: "8px" }}>
            <h2
              className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "135%",
                letterSpacing: "-0.02em",
                textAlign: "center",
                color: "var(--foreground)",
              }}
            >
              Who needs to apply for a UK eTA?
            </h2>
            <p
              className="md:!text-[18px] md:!leading-[140%] md:!tracking-[-0.02em]"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.01em",
                textAlign: "center",
                color: "var(--muted)",
              }}
            >
              Visa-exempt travellers need a valid UK eTA before boarding their flight, regardless of the purpose of their trip.
            </p>
          </div>

          {/* Image + eligibility list */}
          <div className="flex flex-col md:flex-row" style={{ gap: "32px", marginTop: "32px" }}>
            {/* Left: image */}
            <Image
              src={image18}
              alt="Who needs UK eTA"
              width={624}
              height={540}
              style={{ width: "100%", maxWidth: "624px", height: "auto", borderRadius: "16px", objectFit: "cover" }}
            />

            {/* Right: eligibility list */}
            <div className="flex flex-col" style={{ flex: 1 }}>
              <h3
                className="md:!text-[24px]"
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                  marginBottom: "24px",
                }}
              >
                You're likely eligible if you:
              </h3>

              {/* Tick items */}
              {[
                "Your passport is from an eligible country.",
                "You're visiting for tourism, business, family visits, or transit.",
                "You will arrive by air and plan a short stay (typically up to 6 months).",
              ].map((text, i, arr) => (
                <div
                  key={i}
                  className="flex items-center"
                  style={{
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--form-border)" : "none",
                  }}
                >
                  <Image src={tick} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0 }} />
                  <span
                    style={{
                      marginLeft: "16px",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "150%",
                      letterSpacing: "-0.01em",
                      color: "var(--muted)",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}

              {/* You may not need an eTA if: */}
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                  marginTop: "24px",
                  marginBottom: "24px",
                }}
              >
                You may not need an eTA if:
              </h3>

              {/* Cancel items */}
              {[
                "You're a UK citizen or permanent resident.",
                "You already hold a valid UK visa covering your trip.",
                "You're entering by land or sea and your nationality is visa-exempt for those modes.",
              ].map((text, i, arr) => (
                <div
                  key={i}
                  className="flex items-center"
                  style={{
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--form-border)" : "none",
                  }}
                >
                  <Image src={cancel} alt="Cancel" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0 }} />
                  <span
                    style={{
                      marginLeft: "16px",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "150%",
                      letterSpacing: "-0.01em",
                      color: "var(--muted)",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}

              {/* Apply for eTA button */}
              <Link
                href="/apply"
                className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full md:w-auto md:!max-w-[192px] mx-auto md:mx-0"
                style={{
                  height: "48px",
                  marginTop: "24px",
                  paddingTop: "12px",
                  paddingRight: "20px",
                  paddingBottom: "12px",
                  paddingLeft: "20px",
                }}
              >
                Apply for eTA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages section */}
      <Advantages />

      {/* FAQ section */}
      <FAQ />

      {/* Ready to apply section */}
      <Ready />
    </main>
  );
}

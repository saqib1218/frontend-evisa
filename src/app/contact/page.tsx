import Image from "next/image";
import { ArrowRight } from "lucide-react";
import contact from "@/images/contact.svg";
import Advantages from "@/components/Advantages/Advantages";
import FAQ from "@/components/FAQ/faq";
import Ready from "@/components/Ready/Ready";

export default function ContactPage() {
  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "245px" }}>
          <Image
            src={contact}
            alt="Contact us"
            fill
            className="object-cover"
            style={{ borderRadius: "16px" }}
            priority
            sizes="(max-width: 768px) 100vw, 1408px"
            loading="eager"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <button
              className="flex items-center justify-center rounded-full"
              style={{
                width: "114px",
                height: "40px",
                gap: "16px",
                background: "transparent",
                border: "1px solid var(--hero-text)",
                color: "var(--hero-text)",
              }}
            >
              Contact Us
            </button>
            <h1
              className="text-white text-center md:!text-[56px] md:!leading-[110%] md:!tracking-[-0.03em]"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "135%",
                letterSpacing: "-0.02em",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              Get in Touch With Us
            </h1>
          </div>
        </div>
      </div>

      {/* Send us a message section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", gap: "56px", paddingTop: "48px", paddingBottom: "48px" }}>
        <h2
          className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "135%",
            letterSpacing: "-0.02em",
            textAlign: "center",
            color: "var(--text-heading)",
          }}
        >
          Send Us A Message
        </h2>

        {/* Form card */}
        <div
          className="mx-auto mt-8 flex flex-col p-4 md:!p-[32px]"
          style={{
            maxWidth: "898px",
            gap: "32px",
            borderRadius: "24px",
            background: "var(--form-bg)",
            border: "none",
          }}
        >
          {/* First row: 2 inputs */}
          <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
            {/* Full Name */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  height: "56px",
                  gap: "10px",
                  borderRadius: "999px",
                  border: "1px solid var(--form-border)",
                  padding: "16px",
                  background: "var(--input-bg)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--placeholder-text)",
                  outline: "none",
                }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  width: "100%",
                  height: "56px",
                  gap: "10px",
                  borderRadius: "999px",
                  border: "1px solid var(--form-border)",
                  padding: "16px",
                  background: "var(--input-bg)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--placeholder-text)",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Second row: 2 inputs */}
          <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
            {/* Phone Number */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                style={{
                  width: "100%",
                  height: "56px",
                  gap: "10px",
                  borderRadius: "999px",
                  border: "1px solid var(--form-border)",
                  padding: "16px",
                  background: "var(--input-bg)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--placeholder-text)",
                  outline: "none",
                }}
              />
            </div>

            {/* City */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                }}
              >
                City
              </label>
              <input
                type="text"
                placeholder="Enter your city here"
                style={{
                  width: "100%",
                  height: "56px",
                  gap: "10px",
                  borderRadius: "999px",
                  border: "1px solid var(--form-border)",
                  padding: "16px",
                  background: "var(--input-bg)",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "var(--placeholder-text)",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Message textarea */}
          <div className="flex flex-col" style={{ gap: "8px" }}>
            <label
              style={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
              }}
            >
              Message
            </label>
            <textarea
              placeholder="Enter your message here"
              rows={5}
              style={{
                width: "100%",
                gap: "10px",
                borderRadius: "16px",
                border: "1px solid var(--form-border)",
                padding: "16px",
                background: "var(--input-bg)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.01em",
                color: "var(--placeholder-text)",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Send Message button */}
          <div className="flex justify-center" style={{ marginTop: "8px" }}>
            <button
              className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover cursor-pointer w-full md:w-auto md:!max-w-[182px]"
              style={{
                height: "48px",
                gap: "8px",
                paddingTop: "12px",
                paddingRight: "20px",
                paddingBottom: "12px",
                paddingLeft: "20px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
                letterSpacing: "-0.01em",
              }}
            >
              Send Message
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advantages section */}
      <Advantages />

      {/* FAQ section */}
      <FAQ />

      {/* Ready section */}
      <Ready />
    </main>
  );
}

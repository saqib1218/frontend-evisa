"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import contact from "@/images/contact.svg";
import Advantages from "@/components/Advantages/Advantages";
import FAQ from "@/components/FAQ/faq";
import Ready from "@/components/Ready/Ready";
import { api } from "@/utils/api";
import { Check, X } from "lucide-react";

const inputStyle: React.CSSProperties = {
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
};

const labelStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "140%",
  letterSpacing: "-0.02em",
  color: "var(--text-heading)",
};

const errorStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "150%",
  color: "#DF1C41",
  marginTop: "4px",
};

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const isValidEmail = (val: string) => /^\S+@\S+\.\S+$/.test(val.trim());
  const isValidPhone = (val: string) => /^[0-9+\s\-()]+$/.test(val.trim()) && val.trim().length > 0;

  const errors = {
    fullName: !fullName.trim() ? "Full name is required" : "",
    email: !email.trim() ? "Email is required" : !isValidEmail(email) ? "Enter a valid email address" : "",
    phone: !phone.trim() ? "Phone number is required" : !isValidPhone(phone) ? "Enter a valid phone number (numbers only)" : "",
    city: !city.trim() ? "City is required" : "",
    message: !message.trim() ? "Message is required" : "",
  };

  const hasErrors = Object.values(errors).some((e) => e);

  const handleSubmit = async () => {
    setApiError("");

    if (hasErrors) {
      setShowErrors(true);
      return;
    }

    setSubmitting(true);
    try {
      await api.submitQuery({ fullName, email, phone, city, message });
      setShowSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setCity("");
      setMessage("");
      setShowErrors(false);
    } catch (err: any) {
      setApiError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ ...inputStyle, border: showErrors && errors.fullName ? "1px solid #DF1C41" : inputStyle.border }}
              />
              {showErrors && errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...inputStyle, border: showErrors && errors.email ? "1px solid #DF1C41" : inputStyle.border }}
              />
              {showErrors && errors.email && <span style={errorStyle}>{errors.email}</span>}
            </div>
          </div>

          {/* Second row: 2 inputs */}
          <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
            {/* Phone Number */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ ...inputStyle, border: showErrors && errors.phone ? "1px solid #DF1C41" : inputStyle.border }}
              />
              {showErrors && errors.phone && <span style={errorStyle}>{errors.phone}</span>}
            </div>

            {/* City */}
            <div className="flex flex-col" style={{ flex: 1, gap: "8px" }}>
              <label style={labelStyle}>City</label>
              <input
                type="text"
                placeholder="Enter your city here"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ ...inputStyle, border: showErrors && errors.city ? "1px solid #DF1C41" : inputStyle.border }}
              />
              {showErrors && errors.city && <span style={errorStyle}>{errors.city}</span>}
            </div>
          </div>

          {/* Message textarea */}
          <div className="flex flex-col" style={{ gap: "8px" }}>
            <label style={labelStyle}>Message</label>
            <textarea
              placeholder="Enter your message here"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                gap: "10px",
                borderRadius: "16px",
                border: showErrors && errors.message ? "1px solid #DF1C41" : "1px solid var(--form-border)",
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
            {showErrors && errors.message && <span style={errorStyle}>{errors.message}</span>}
          </div>

          {/* Send Message button */}
          <div className="flex justify-center" style={{ marginTop: "8px" }}>
            <button
              onClick={handleSubmit}
              disabled={submitting}
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
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Sending..." : "Send Message"}
              {!submitting && <ArrowRight className="h-4 w-4" />}
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

      {/* Success Popup */}
      {showSuccess && (
        <div
          onClick={() => setShowSuccess(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "440px",
              background: "var(--card)",
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <X style={{ width: "20px", height: "20px", color: "var(--placeholder-text)" }} />
            </button>

            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#E6F4F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check style={{ width: "32px", height: "32px", color: "#28806F" }} />
            </div>

            <span
              style={{
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: "140%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
                textAlign: "center",
              }}
            >
              Success
            </span>

            <span
              style={{
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: "160%",
                color: "var(--text-body)",
                textAlign: "center",
              }}
            >
              Your message has been sent successfully!
            </span>

            <button
              onClick={() => setShowSuccess(false)}
              style={{
                height: "40px",
                paddingLeft: "24px",
                paddingRight: "24px",
                borderRadius: "999px",
                border: "none",
                background: "#28806F",
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                marginTop: "4px",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error banner */}
      {apiError && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 24px",
            borderRadius: "12px",
            background: "#FEE2E2",
            color: "#DF1C41",
            fontSize: "14px",
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {apiError}
        </div>
      )}
    </main>
  );
}

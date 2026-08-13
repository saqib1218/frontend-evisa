"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need a visa or an eTA to travel to the UK?",
    answer:
      "It depends on your nationality. If you are from a visa-exempt country, you will need an eTA. If your country requires a visa, you must apply for a standard UK visa instead. Check the UK government's official list to confirm which document applies to you.",
  },
  {
    question: "When does the eTA become mandatory for my nationality?",
    answer:
      "The UK is rolling out the eTA requirement in phases. Some nationalities already need an eTA, while others will be added over time. We recommend checking the latest government updates or contacting us to confirm your requirements before booking travel.",
  },
  {
    question: "How long is my UK eTA valid for?",
    answer:
      "A UK eTA is typically valid for up to 2 years or until your passport expires, whichever comes first. You can use it for multiple trips during its validity period, with each stay usually lasting up to 6 months.",
  },
  {
    question: "I'm only transiting through the UK. Do I need an eTA?",
    answer:
      "Yes, in most cases travellers transiting through the UK by air will need an eTA, even if they do not leave the airport. Make sure to apply before your journey to avoid any boarding issues.",
  },
  {
    question: "Do babies and children need their own eTA?",
    answer:
      "Yes, every traveller including babies and children must have their own individual eTA linked to their own passport. Parents or guardians can apply on their behalf.",
  },
  {
    question: "Can I apply with a criminal record or previous visa refusal?",
    answer:
      "You can still apply, but a criminal record or previous visa refusal may affect your eligibility. We recommend providing full and accurate information in your application. Our specialists can review your case and guide you on the best approach.",
  },
  {
    question: "Why use your service instead of the government site?",
    answer:
      "Our service offers expert review of your application before submission, clear status tracking, around-the-clock support from real people, and the ability to save and resume your application anytime. We help reduce errors and improve your chances of a smooth approval.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto px-4 md:!pt-[120px] md:!pb-[120px] md:!px-10" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
      <div className="mx-auto px-4 md:!pt-[80px] md:!pb-[80px] md:!px-8 md:!border-none" style={{ maxWidth: "1360px", paddingTop: "32px", paddingBottom: "32px", borderRadius: "16px", background: "#FAFAF9", border: "1px solid #D9D9D9" }}>
        {/* Heading */}
        <div className="mx-auto flex flex-col items-center" style={{ maxWidth: "720px", gap: "8px" }}>
          <h2
            className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]"
            style={{
              fontSize: "32px",
              fontWeight: 500,
              lineHeight: "135%",
              letterSpacing: "-0.02em",
              textAlign: "center",
              color: "#0F0F0F",
            }}
          >
            Frequently Asked Questions
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
            FAQs address common inquiries and provide essential information, helping users find solutions quickly.
          </p>
        </div>

        {/* FAQ items */}
        <div className="mx-auto mt-8 flex flex-col" style={{ gap: "20px" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={isOpen ? "md:!rounded-[10px]" : "md:!rounded-[99px]"}
                style={{
                  maxWidth: "100%",
                  borderRadius: "8px",
                  border: `1px solid ${isOpen ? "var(--primary)" : "#D9D9D9"}`,
                  padding: "20px",
                  background: isOpen ? "#EFF4F9" : "#FFFFFF",
                  gap: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between cursor-pointer"
                  style={{ textAlign: "left" }}
                >
                  <span
                    className="md:!text-[24px]"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: "140%",
                      letterSpacing: "-0.02em",
                      color: isOpen ? "var(--primary)" : "#0F0F0F",
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="flex-shrink-0 transition-transform"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: isOpen ? "var(--primary)" : "#0F0F0F",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "150%",
                      letterSpacing: "-0.01em",
                      color: "var(--muted)",
                      marginTop: "12px",
                      paddingLeft: "4px",
                    }}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Apply Today button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/apply"
            className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full md:w-auto md:!max-w-[165px]"
            style={{
              height: "48px",
              paddingTop: "12px",
              paddingRight: "20px",
              paddingBottom: "12px",
              paddingLeft: "20px",
            }}
          >
            Apply Today
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

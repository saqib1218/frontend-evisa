"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto px-4 md:!pt-[120px] md:!pb-[120px] md:!px-10" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
      <div className="mx-auto px-4 md:!pt-[80px] md:!pb-[80px] md:!px-8 md:!border-none" style={{ maxWidth: "1360px", paddingTop: "32px", paddingBottom: "32px", borderRadius: "16px", background: "var(--form-bg)", border: "1px solid var(--form-border)" }}>
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
              color: "var(--text-heading)",
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
                  border: `1px solid ${isOpen ? "var(--primary)" : "var(--form-border)"}`,
                  padding: "20px",
                  background: isOpen ? "var(--accent-bg)" : "var(--input-bg)",
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
                      color: isOpen ? "var(--primary)" : "var(--text-heading)",
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="flex-shrink-0 transition-transform"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: isOpen ? "var(--primary)" : "var(--text-heading)",
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

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, FileText, UsersRound } from "lucide-react";
import about from "@/images/about.svg";
import about2 from "@/images/about2.svg";
import about3 from "@/images/about3.svg";
import btick from "@/images/btick.svg";

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveStep(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -30% 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      num: "01",
      icon: Search,
      title: "Real Human Review",
      desc: "Every application is checked by a specialist before it's submitted, so small mistakes don't turn into big delays.",
    },
    {
      num: "02",
      icon: FileText,
      title: "Clear, Guided Process",
      desc: "No confusing forms or unclear steps. We walk you through exactly what's needed, in plain language, from start to finish.",
    },
    {
      num: "03",
      icon: UsersRound,
      title: "Honest & Independent",
      desc: "We're not a government agency and we don't pretend to be. Just a team focused on getting your application right.",
    },
  ];

  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "245px" }}>
          <Image
            src={about}
            alt="About us"
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
              About Us
            </button>
            <div style={{ maxWidth: "697px", marginTop: "16px" }}>
              <h1
                className="text-white text-center md:!text-[56px] md:!leading-[110%] md:!tracking-[-0.03em]"
                style={{
                  fontSize: "32px",
                  fontWeight: 500,
                  lineHeight: "135%",
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                Making Travel <br className="hidden md:block" /> Authorization Simple
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", gap: "56px", paddingTop: "48px", paddingBottom: "48px" }}>
        {/* First row: text first on mobile, image first on desktop */}
        <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
          {/* Text side */}
          <div className="flex flex-col md:order-1 order-1" style={{ flex: 1 }}>
            <span
              className="md:!text-[16px] md:!leading-[150%] md:!tracking-[-0.01em]"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "160%",
                letterSpacing: "0em",
                color: "var(--primary)",
              }}
            >
              Who We Are
            </span>
            <h2
              className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "135%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
                marginTop: "12px",
              }}
            >
              We Make Your ETA Application Easier
            </h2>
            <p
              className="md:!text-[16px]"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.01em",
                color: "var(--text-body)",
                marginTop: "12px",
              }}
            >
              We built <span style={{ color: "var(--primary)", fontWeight: 700 }}>Evisaeta</span> because too many travellers were getting stuck, confused, or rejected over small mistakes they didn&apos;t even know they made. So now, a real person checks your application before it goes anywhere near a government portal.
            </p>

            {/* Tick items */}
            <div className="flex items-center" style={{ marginTop: "12px", gap: "8px" }}>
              <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                Independent service, not affiliated with any government
              </span>
            </div>
            <div className="flex items-center" style={{ marginTop: "12px", gap: "8px" }}>
              <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                Real specialists reviewing every application, not just a bot
              </span>
            </div>
            <div className="flex items-center" style={{ marginTop: "12px", gap: "8px" }}>
              <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                Honest guidance, so you know exactly where you stand
              </span>
            </div>

            {/* Apply button */}
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full md:w-auto md:!max-w-[192px] mt-6 md:mt-auto"
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
              Apply for ETA
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Image side */}
          <div className="md:order-2 order-2" style={{ flexShrink: 0 }}>
            <Image
              src={about2}
              alt="About us 2"
              width={644}
              height={456}
              style={{ width: "100%", maxWidth: "644px", height: "auto", objectFit: "cover", borderRadius: "16px" }}
            />
          </div>
        </div>

        {/* 56px gap between rows */}
        <div style={{ height: "56px" }} />

        {/* Second row: text first on mobile, image first on desktop */}
        <div className="flex flex-col md:flex-row" style={{ gap: "32px" }}>
          {/* Image side - on desktop left, on mobile second */}
          <div className="md:order-1 order-2" style={{ flexShrink: 0 }}>
            <Image
              src={about3}
              alt="About us 3"
              width={644}
              height={456}
              style={{ width: "100%", maxWidth: "644px", height: "auto", objectFit: "cover", borderRadius: "16px" }}
            />
          </div>

          {/* Text side - on desktop right, on mobile first */}
          <div className="flex flex-col md:order-2 order-1" style={{ flex: 1 }}>
            <span
              className="md:!text-[16px] md:!leading-[150%] md:!tracking-[-0.01em]"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "160%",
                letterSpacing: "0em",
                color: "var(--primary)",
              }}
            >
              What We Do
            </span>
            <h2
              className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "135%",
                letterSpacing: "-0.02em",
                color: "var(--text-heading)",
                marginTop: "12px",
              }}
            >
              We Catch the Mistakes Before They Cost You a Trip
            </h2>
            <p
              className="md:!text-[16px]"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
                letterSpacing: "-0.01em",
                color: "var(--text-body)",
                marginTop: "12px",
              }}
            >
              You fill out a short form. We check it. If something looks off, a passport number that doesn&apos;t match, a question you misunderstood, we flag it before you submit. Then we walk it through the process with you and keep you updated until you get your decision.
            </p>

            {/* Tick items */}
            <div className="flex items-center" style={{ marginTop: "12px", gap: "8px" }}>
              <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                Every application reviewed for accuracy before submission
              </span>
            </div>
            <div className="flex items-center" style={{ marginTop: "12px", gap: "8px" }}>
              <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                Support available around the clock, not just office hours
              </span>
            </div>
            <div className="flex items-center" style={{ marginTop: "12px", gap: "8px" }}>
              <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
              <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                Clear status updates, so you&apos;re never left guessing
              </span>
            </div>

            {/* Get Started button */}
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full md:w-auto md:!max-w-[192px] mt-6 md:mt-auto"
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
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us section */}
      <div className="mx-auto" style={{ maxWidth: "1440px", paddingBottom: "120px" }}>
        <div className="px-4 py-8 md:!px-10 md:!py-[72px]" style={{ background: "var(--form-bg)", gap: "8px", paddingTop: "32px", paddingBottom: "32px" }}>
          <div className="flex flex-col md:flex-row" style={{ gap: "56px" }}>
            {/* Left side - sticky on desktop, static on mobile */}
            <div className="flex flex-col md:!max-w-[540px] md:flex-shrink-0 md:sticky md:top-10 md:h-fit md:self-start" style={{ flexShrink: 0 }}>
              <span
                className="md:!text-[16px] md:!leading-[150%] md:!tracking-[-0.01em]"
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "160%",
                  letterSpacing: "0em",
                  color: "var(--primary)",
                }}
              >
                Why Choose Us
              </span>
              <h2
                className="md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]"
                style={{
                  fontSize: "32px",
                  fontWeight: 500,
                  fontStyle: "italic",
                  lineHeight: "135%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-heading)",
                  marginTop: "12px",
                }}
              >
                What Makes <span style={{ color: "var(--primary)" }}>Evisaeta</span> Different
              </h2>
              <p
                className="md:!text-[16px] md:!leading-[150%] md:!tracking-[-0.01em]"
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  lineHeight: "140%",
                  letterSpacing: "-0.02em",
                  color: "var(--text-body)",
                  marginTop: "24px",
                }}
              >
                We combine expert review with real human support, so your application gets done right, without the stress.
              </p>
              <Link
                href="/apply"
                className="flex items-center justify-center gap-3 rounded-full bg-primary text-white transition-colors hover:bg-primary-hover w-full md:w-auto md:!max-w-[165px] mt-6 md:mt-6"
                style={{
                  height: "48px",
                  gap: "12px",
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
                Apply Today
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right side: cards only on mobile (no numbers/dividers), full layout on desktop */}
            <div className="flex flex-col" style={{ flex: 1 }}>
              {cards.map((card, index) => {
                const isActive = activeStep === index;
                const Icon = card.icon;
                return (
                  <div key={card.num}>
                    {index > 0 && (
                      <div className="hidden md:block" style={{ width: "48px", height: "20px", position: "relative", flexShrink: 0 }}>
                        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "2px", background: "var(--primary)", transform: "translateX(-50%)" }} />
                      </div>
                    )}
                    <div className="flex items-stretch" style={{ gap: "24px" }}>
                      {/* Number column - hidden on mobile */}
                      <div className="hidden md:block relative flex-shrink-0" style={{ width: "48px" }}>
                        {index < cards.length - 1 && (
                          <div style={{ position: "absolute", bottom: 0, left: "50%", width: "2px", height: "50%", background: "var(--primary)", transform: "translateX(-50%)" }} />
                        )}
                        {index > 0 && (
                          <div style={{ position: "absolute", top: 0, left: "50%", width: "2px", height: "50%", background: "var(--primary)", transform: "translateX(-50%)" }} />
                        )}
                        <div
                          className="flex items-center justify-center"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "48px",
                            height: "48px",
                            borderRadius: "1000px",
                            background: isActive ? "var(--primary)" : "var(--input-bg)",
                            zIndex: 1,
                            transition: "background 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Inter Tight, sans-serif",
                              fontSize: "18px",
                              fontWeight: 500,
                              lineHeight: "26px",
                              color: isActive ? "var(--hero-text)" : "var(--primary)",
                              transition: "color 0.3s ease",
                            }}
                          >
                            {card.num}
                          </span>
                        </div>
                      </div>
                      <div
                        ref={(el) => { cardRefs.current[index] = el; }}
                        data-index={index}
                        className="md:!max-w-[692px] md:!gap-[20px] md:!mb-0 md:!p-[32px] flex flex-col mb-4 p-4"
                        style={{
                          maxWidth: "100%",
                          gap: "20px",
                          borderRadius: "12px",
                          background: isActive ? "var(--accent-bg)" : "var(--input-bg)",
                          flex: 1,
                          border: isActive ? "1px solid var(--primary)" : "1px solid transparent",
                          transition: "border 0.3s ease",
                        }}
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "1000px",
                            background: isActive ? "var(--primary)" : "var(--accent-bg)",
                            transition: "background 0.3s ease",
                          }}
                        >
                          <Icon
                            className={isActive ? "text-white" : "text-primary"}
                            style={{ width: "32px", height: "32px", transition: "color 0.3s ease" }}
                          />
                        </div>
                        <h3
                          className="md:!text-[24px]"
                          style={{
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "140%",
                            letterSpacing: "-0.02em",
                            color: isActive ? "var(--primary)" : "var(--text-heading)",
                            marginTop: "20px",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "150%",
                            letterSpacing: "-0.01em",
                            color: "var(--text-body)",
                          }}
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

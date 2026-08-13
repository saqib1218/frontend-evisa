"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, BookUser, ChevronDown, ArrowRight, Check } from "lucide-react";
import { countries, type Country } from "@/data/countries";

interface DropdownProps {
  placeholder: string;
  icon: React.ReactNode;
  value: Country | null;
  onChange: (country: Country) => void;
}

function Dropdown({ placeholder, icon, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-full bg-white px-4 py-3 text-left"
        style={{ height: "48px" }}
      >
        <span style={{ color: "#A9A9A9", display: "flex", alignItems: "center" }}>
          <span style={{ width: "16.67px", height: "16.67px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {icon}
          </span>
        </span>
        <span
          className="flex-1"
          style={{
            color: value ? "#171717" : "#A9A9A9",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          {value ? `${value.flag} ${value.name}` : placeholder}
        </span>
        <ChevronDown
          className="flex-shrink-0"
          style={{ color: "#A9A9A9", width: "16.67px", height: "16.67px" }}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-lg [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-base hover:bg-gray-100"
              style={{ color: "#171717" }}
            >
              <span className="text-xl">{country.flag}</span>
              <span className="flex-1">{country.name}</span>
              {value?.code === country.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Applycard() {
  const [destination, setDestination] = useState<Country | null>(null);
  const [passport, setPassport] = useState<Country | null>(null);

  const isReady = destination !== null && passport !== null;

  return (
    <div
      className="flex flex-col gap-6 rounded-2xl border border-white p-6"
      style={{
        maxWidth: "435px",
        width: "100%",
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="text-center">
        <h2
          className="text-white text-center md:!text-[32px] md:!leading-[135%]"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "140%",
            letterSpacing: "-0.02em",
          }}
        >
          Apply for your UK eTA
        </h2>
      </div>

      <p
        className="text-center text-white md:!text-[16px] md:!leading-[150%] md:!tracking-[-0.01em]"
        style={{
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "160%",
          letterSpacing: "0em",
        }}
      >
        Mandatory entry document required for tourism, transit, or business
        travel to the United Kingdom.
      </p>

      <div className="flex flex-col gap-2">
        <label
          className="text-white"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "150%",
            letterSpacing: "-0.01em",
          }}
        >
          Select Destination
        </label>
        <Dropdown
          placeholder="Select your destination"
          icon={<Globe className="h-5 w-5" />}
          value={destination}
          onChange={setDestination}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-white"
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "150%",
            letterSpacing: "-0.01em",
          }}
        >
          Applicant&apos;s passport
        </label>
        <Dropdown
          placeholder="Select your country"
          icon={<BookUser className="h-5 w-5" />}
          value={passport}
          onChange={setPassport}
        />
      </div>

      <button
        type="button"
        disabled={!isReady}
        className="flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-medium transition-colors"
        style={{
          backgroundColor: isReady ? "var(--primary)" : "#D9D9D9",
          color: isReady ? "#FFFFFF" : "#A9A9A9",
          cursor: isReady ? "pointer" : "not-allowed",
        }}
      >
        Get started
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

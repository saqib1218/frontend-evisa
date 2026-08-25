"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, BookUser, ChevronDown, ArrowRight, Check, Search } from "lucide-react";
import { countries, type Country } from "@/data/countries";

const UK_COUNTRY = countries.find((c) => c.code === "GB") || { name: "United Kingdom", code: "GB", flag: "🇬🇧" };

interface DropdownProps {
  placeholder: string;
  icon: React.ReactNode;
  value: Country | null;
  onChange: (country: Country) => void;
  searchable?: boolean;
}

function Dropdown({ placeholder, icon, value, onChange, searchable }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, searchable]);

  const filteredCountries = searchQuery
    ? countries.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : countries;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-full px-4 py-3 text-left"
        style={{ height: "48px", background: "var(--input-bg)" }}
      >
        <span style={{ color: "var(--icon-muted)", display: "flex", alignItems: "center" }}>
          <span style={{ width: "16.67px", height: "16.67px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {icon}
          </span>
        </span>
        <span
          className="flex-1"
          style={{
            color: value ? "var(--foreground)" : "var(--icon-muted)",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          {value ? `${value.flag} ${value.name}` : placeholder}
        </span>
        <ChevronDown
          className="flex-shrink-0"
          style={{ color: "var(--icon-muted)", width: "16.67px", height: "16.67px" }}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl shadow-lg [&::-webkit-scrollbar]:hidden [scrollbar-width:none]" style={{ background: "var(--input-bg)" }}>
          {searchable && (
            <div className="sticky top-0" style={{ background: "var(--input-bg)", padding: "8px", borderBottom: "1px solid var(--form-border)" }}>
              <div className="flex items-center gap-2 rounded-full px-3" style={{ background: "var(--form-bg)", height: "36px" }}>
                <Search style={{ width: "14px", height: "14px", color: "var(--icon-muted)" }} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: "14px", color: "var(--foreground)" }}
                />
              </div>
            </div>
          )}
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country);
                setOpen(false);
                setSearchQuery("");
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-base hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              <span className="text-xl">{country.flag}</span>
              <span className="flex-1">{country.name}</span>
              {value?.code === country.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
          {filteredCountries.length === 0 && (
            <div className="px-4 py-3 text-center" style={{ color: "var(--icon-muted)", fontSize: "14px" }}>
              No countries found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Applycard() {
  const router = useRouter();
  const [destination] = useState<Country | null>(UK_COUNTRY);
  const [passport, setPassport] = useState<Country | null>(null);

  const isReady = passport !== null;

  return (
    <div
      className="flex flex-col gap-6 rounded-2xl p-6"
      style={{
        maxWidth: "435px",
        width: "100%",
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.1)", border: "1px solid var(--hero-text)",
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
          Destination
        </label>
        <div
          className="flex w-full items-center gap-2 rounded-full px-4 py-3"
          style={{ height: "48px", background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.3)" }}
        >
          <span style={{ color: "var(--hero-text)", display: "flex", alignItems: "center" }}>
            <span style={{ width: "16.67px", height: "16.67px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe className="h-5 w-5" />
            </span>
          </span>
          <span className="flex-1" style={{ color: "var(--hero-text)", fontSize: "14px", fontWeight: 400 }}>
            {UK_COUNTRY.flag} {UK_COUNTRY.name}
          </span>
          <Check className="h-4 w-4" style={{ color: "var(--hero-text)" }} />
        </div>
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
          searchable
        />
      </div>

      <button
        type="button"
        disabled={!isReady}
        onClick={() => isReady && router.push("/apply")}
        className="flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-medium transition-colors"
        style={{
          backgroundColor: isReady ? "var(--primary)" : "var(--form-border)",
          color: isReady ? "var(--hero-text)" : "var(--icon-muted)",
          cursor: isReady ? "pointer" : "not-allowed",
        }}
      >
        Get started
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronDown, ChevronUp, Trash2, Globe, Check, ArrowRight, ArrowLeft, Plus, Upload, Clock, DollarSign, User, Search } from "lucide-react";
import DeleteModal from "./Models/Deletemodal/DeleteModal";
import about from "@/images/about.svg";
import btick from "@/images/btick.svg";
import pasport1 from "@/images/pasport1.svg";
import uploadIcon from "@/images/upload.svg";
import p1 from "@/images/p1.svg";
import p2 from "@/images/p2.svg";
import p3 from "@/images/p3.svg";
import pc from "@/images/pc.svg";
import pt from "@/images/pt.svg";
import r1 from "@/images/r1.svg";
import r2 from "@/images/r2.svg";
import r3 from "@/images/r3.svg";
import r4 from "@/images/r4.svg";
import r5 from "@/images/r5.svg";
import r6 from "@/images/r6.svg";
import r7 from "@/images/r7.svg";
import r8 from "@/images/r8.svg";
import { countries, type Country } from "@/data/countries";
import { api } from "@/utils/api";
import { useToast, ToastContainer } from "@/utils/toast";

const steps = ["Applicant", "Passport", "Passport image", "Your photo", "Review", "Payment"];

const labelStyle = {
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "140%",
  letterSpacing: "-0.02em",
  color: "var(--text-heading)",
};

const helperStyle = {
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "165%",
  letterSpacing: "0em",
  color: "var(--text-body)",
};

const fieldStyle = {
  height: "56px",
  borderRadius: "999px",
  border: "1px solid var(--form-border)",
  padding: "16px",
  background: "var(--input-bg)",
  fontSize: "16px",
  fontWeight: 400,
  color: "var(--text-heading)",
  width: "100%",
  outline: "none",
};

function CountryDropdown({ placeholder, value: externalValue, onChange }: { placeholder: string; value?: Country | null; onChange?: (v: Country | null) => void }) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = (v: Country | null) => {
    setInternalValue(v);
    onChange?.(v);
  };
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
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredCountries = searchQuery
    ? countries.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : countries;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="dropdown-btn flex w-full items-center gap-2.5 cursor-pointer"
        style={{ height: "56px", borderRadius: "999px", border: "1px solid var(--form-border)", padding: "16px", background: "var(--input-bg)" }}
      >
        <Globe style={{ color: "var(--icon-muted)", width: "20px", height: "20px", flexShrink: 0 }} />
        <span className="flex-1 text-left" style={{ color: value ? "var(--text-heading)" : "var(--icon-muted)", fontSize: "16px", fontWeight: 400 }}>
          {value ? `${value.flag} ${value.name}` : placeholder}
        </span>
        <ChevronDown style={{ color: "var(--icon-muted)", width: "20px", height: "20px", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl shadow-lg [&::-webkit-scrollbar]:hidden [scrollbar-width:none]" style={{ background: "var(--input-bg)", border: "1px solid var(--form-border)" }}>
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
                style={{ fontSize: "14px", color: "var(--text-heading)" }}
              />
            </div>
          </div>
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => { setValue(country); setOpen(false); setSearchQuery(""); }}
              className="dropdown-option flex w-full items-center gap-3 px-4 py-3 text-left text-base hover:opacity-80"
              style={{ color: "var(--text-heading)" }}
            >
              <span className="text-xl">{country.flag}</span>
              <span className="flex-1">{country.name}</span>
              {value?.code === country.code && <Check className="h-4 w-4" style={{ color: "var(--primary)" }} />}
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

function GenericDropdown({ placeholder, options, value: controlledValue, onChange }: { placeholder: string; options: string[]; value?: string | null; onChange?: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [internalValue, setValue] = useState<string | null>(null);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="dropdown-btn flex w-full items-center justify-between cursor-pointer"
        style={{ height: "56px", borderRadius: "999px", border: "1px solid var(--form-border)", padding: "16px", background: "var(--input-bg)" }}
      >
        <span className="flex-1 text-left" style={{ color: value ? "var(--text-heading)" : "var(--icon-muted)", fontSize: "16px", fontWeight: 400 }}>
          {value || placeholder}
        </span>
        <ChevronDown style={{ color: "var(--icon-muted)", width: "20px", height: "20px", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl shadow-lg" style={{ background: "var(--input-bg)", border: "1px solid var(--form-border)" }}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { setValue(option); setOpen(false); onChange?.(option); }}
              className="dropdown-option flex w-full items-center px-4 py-3 text-left text-base hover:opacity-80"
              style={{ color: "var(--text-heading)" }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DateDropdown({ placeholder, options, label, value: externalValue, onChange }: { placeholder: string; options: string[]; label: string; value?: string | null; onChange?: (v: string | null) => void }) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = (v: string | null) => {
    setInternalValue(v);
    onChange?.(v);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="dropdown-btn flex w-full items-center justify-between cursor-pointer"
          style={{ height: "56px", borderRadius: "999px", border: "1px solid var(--form-border)", padding: "16px", background: "var(--input-bg)" }}
        >
          <span className="flex-1 text-center" style={{ color: value ? "var(--text-heading)" : "var(--icon-muted)", fontSize: "16px", fontWeight: 400 }}>
            {value || placeholder}
          </span>
          <ChevronDown style={{ color: "var(--icon-muted)", width: "20px", height: "20px", flexShrink: 0 }} />
        </button>
        {open && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl shadow-lg" style={{ background: "var(--input-bg)", border: "1px solid var(--form-border)" }}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => { setValue(option); setOpen(false); }}
                className="dropdown-option flex w-full items-center justify-center px-4 py-3 text-base hover:opacity-80"
                style={{ color: "var(--text-heading)" }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <p style={{ ...helperStyle, marginTop: "4px", textAlign: "center" }}>{label}</p>
    </div>
  );
}

function YesNoToggle({ value, onChange }: { value: "yes" | "no"; onChange: (v: "yes" | "no") => void }) {
  return (
    <div className="flex" style={{ gap: "24px", marginTop: "8px" }}>
      <label className="flex items-center cursor-pointer" style={{ gap: "8px" }}>
        <div
          onClick={() => onChange("no")}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: value === "no" ? "8px solid var(--primary)" : "1px solid var(--form-border)",
            background: "var(--input-bg)",
            flexShrink: 0,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        />
        <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
          No
        </span>
      </label>
      <label className="flex items-center cursor-pointer" style={{ gap: "8px" }}>
        <div
          onClick={() => onChange("yes")}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: value === "yes" ? "8px solid var(--primary)" : "1px solid var(--form-border)",
            background: "var(--input-bg)",
            flexShrink: 0,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        />
        <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
          Yes
        </span>
      </label>
    </div>
  );
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  const [applicants, setApplicants] = useState<{ id: number; expanded: boolean; saved: boolean }[]>([
    { id: 1, expanded: true, saved: false },
  ]);
  const [nextId, setNextId] = useState(2);
  const [passportApplicants, setPassportApplicants] = useState<{ id: number; expanded: boolean; saved: boolean; otherCitizen: "yes" | "no"; prevApplied: "yes" | "no" }[]>([]);
  const [imageApplicants, setImageApplicants] = useState<{ id: number; expanded: boolean; saved: boolean }[]>([]);
  const [imageConsent, setImageConsent] = useState<Record<number, boolean>>({});
  const [photoApplicants, setPhotoApplicants] = useState<{ id: number; expanded: boolean; saved: boolean }[]>([]);
  const [photoConsent, setPhotoConsent] = useState<Record<number, boolean>>({});

  // Applicant form data: { [id]: { firstName, lastName } }
  const [applicantNames, setApplicantNames] = useState<Record<number, { firstName: string; lastName: string }>>({});
  const [applicantEmails, setApplicantEmails] = useState<Record<number, string>>({});
  const [applicantPhones, setApplicantPhones] = useState<Record<number, string>>({});
  const [applicantDOB, setApplicantDOB] = useState<Record<number, { day: string | null; month: string | null; year: string | null }>>({});
  const [applicantGender, setApplicantGender] = useState<Record<number, string>>({});
  const [applicantCountryOfBirth, setApplicantCountryOfBirth] = useState<Record<number, Country | null>>({});

  // Review consent
  const [reviewConsent, setReviewConsent] = useState<{ confirmInfo: boolean; privacyNotice: boolean }>({ confirmInfo: false, privacyNotice: false });

  // Uploaded images: { [applicantId]: dataUrl }
  const [passportImages, setPassportImages] = useState<Record<number, string>>({});
  const [photoImages, setPhotoImages] = useState<Record<number, string>>({});
  const [dragOverApplicant, setDragOverApplicant] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, string>>({});
  const MAX_IMAGE_SIZE_MB = 5;

  const handleFileUpload = (applicantId: number, file: File, type: "passport" | "photo") => {
    if (!file) return;
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_IMAGE_SIZE_MB) {
      setImageErrors((prev) => ({ ...prev, [applicantId]: `Image is too large (${sizeMB.toFixed(1)}MB). Maximum allowed is ${MAX_IMAGE_SIZE_MB}MB. Please upload a smaller image.` }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setImageErrors((prev) => ({ ...prev, [applicantId]: "Please upload a valid image file (JPG, PNG, etc)." }));
      return;
    }
    setImageErrors((prev) => { const next = { ...prev }; delete next[applicantId]; return next; });
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (type === "passport") {
        setPassportImages((prev) => ({ ...prev, [applicantId]: dataUrl }));
      } else {
        setPhotoImages((prev) => ({ ...prev, [applicantId]: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (applicantId: number, e: React.ChangeEvent<HTMLInputElement>, type: "passport" | "photo") => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(applicantId, file, type);
  };

  const handleDrop = (applicantId: number, e: React.DragEvent, type: "passport" | "photo") => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverApplicant(null);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(applicantId, file, type);
  };

  // Processing speed selection
  const [selectedProcessing, setSelectedProcessing] = useState<"standard" | "express" | "fastest" | "testing">("standard");

  // Delete modal
  const [deleteModalApplicant, setDeleteModalApplicant] = useState<number | null>(null);

  // Passport form data: { [id]: { nationality, passportNumber, dateIssue: {day,month,year}, dateExpiry: {...} } }
  const [passportData, setPassportData] = useState<Record<number, {
    nationality: Country | null;
    passportNumber: string;
    dateIssue: { day: string | null; month: string | null; year: string | null };
    dateExpiry: { day: string | null; month: string | null; year: string | null };
  }>>({});

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatDate = (d: { day: string | null; month: string | null; year: string | null } | undefined) => {
    if (!d || !d.day || !d.month || !d.year) return "-";
    const monthIdx = parseInt(d.month, 10) - 1;
    return `${parseInt(d.day, 10)} ${monthNames[monthIdx]} ${d.year}`;
  };

  const updateApplicantName = (id: number, field: "firstName" | "lastName", value: string) => {
    setApplicantNames((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const updateApplicantEmail = (id: number, value: string) => {
    setApplicantEmails((prev) => ({ ...prev, [id]: value }));
  };

  const updateApplicantPhone = (id: number, value: string) => {
    setApplicantPhones((prev) => ({ ...prev, [id]: value }));
  };

  const updateApplicantDOB = (id: number, part: "day" | "month" | "year", value: string | null) => {
    setApplicantDOB((prev) => ({
      ...prev,
      [id]: { day: prev[id]?.day ?? null, month: prev[id]?.month ?? null, year: prev[id]?.year ?? null, [part]: value },
    }));
  };

  const updateApplicantGender = (id: number, value: string) => {
    setApplicantGender((prev) => ({ ...prev, [id]: value }));
  };

  const updateApplicantCountryOfBirth = (id: number, value: Country | null) => {
    setApplicantCountryOfBirth((prev) => ({ ...prev, [id]: value }));
  };

  const updatePassportData = (id: number, field: string, value: unknown) => {
    setPassportData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        nationality: prev[id]?.nationality ?? null,
        passportNumber: prev[id]?.passportNumber ?? "",
        dateIssue: prev[id]?.dateIssue ?? { day: null, month: null, year: null },
        dateExpiry: prev[id]?.dateExpiry ?? { day: null, month: null, year: null },
        [field]: value,
      },
    }));
  };

  const updatePassportDateField = (id: number, dateType: "dateIssue" | "dateExpiry", part: "day" | "month" | "year", value: string | null) => {
    setPassportData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        nationality: prev[id]?.nationality ?? null,
        passportNumber: prev[id]?.passportNumber ?? "",
        dateIssue: prev[id]?.dateIssue ?? { day: null, month: null, year: null },
        dateExpiry: prev[id]?.dateExpiry ?? { day: null, month: null, year: null },
        [dateType]: { ...prev[id]?.[dateType], [part]: value },
      },
    }));
  };

  const getApplicantName = (id: number) => {
    const data = applicantNames[id];
    if (!data || (!data.firstName && !data.lastName)) return `Applicant ${applicants.findIndex((a) => a.id === id) + 1}`;
    return `${data.firstName} ${data.lastName}`.trim();
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentDay = String(new Date().getDate()).padStart(2, "0");

  // DOB: 1925 to current year
  const dobYears = Array.from({ length: currentYear - 1925 + 1 }, (_, i) => String(currentYear - i));
  // Issue: 1925 to current year
  const issueYears = Array.from({ length: currentYear - 1925 + 1 }, (_, i) => String(currentYear - i));
  // Expiry: current year to current year + 20
  const expiryYears = Array.from({ length: 21 }, (_, i) => String(currentYear + i));

  // Helper: get valid days for a given year/month combination
  const getValidDays = (year: string | null, month: string | null) => {
    if (!year || !month) return days;
    const numDays = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: numDays }, (_, i) => String(i + 1).padStart(2, "0"));
  };

  // Helper: get valid months for DOB (up to current month if same year)
  const getValidMonthsDOB = (year: string | null) => {
    if (year && parseInt(year) === currentYear) {
      return months.filter((m) => parseInt(m) <= parseInt(currentMonth));
    }
    return months;
  };

  // Helper: get valid days for DOB
  const getValidDaysDOB = (year: string | null, month: string | null) => {
    const validDays = getValidDays(year, month);
    if (year && parseInt(year) === currentYear && month && parseInt(month) === parseInt(currentMonth)) {
      return validDays.filter((d) => parseInt(d) <= parseInt(currentDay));
    }
    return validDays;
  };

  // Helper: get valid months for issue date (up to current month if same year)
  const getValidMonthsIssue = (year: string | null) => {
    if (year && parseInt(year) === currentYear) {
      return months.filter((m) => parseInt(m) <= parseInt(currentMonth));
    }
    return months;
  };

  // Helper: get valid days for issue date
  const getValidDaysIssue = (year: string | null, month: string | null) => {
    const validDays = getValidDays(year, month);
    if (year && parseInt(year) === currentYear && month && parseInt(month) === parseInt(currentMonth)) {
      return validDays.filter((d) => parseInt(d) <= parseInt(currentDay));
    }
    return validDays;
  };

  // Helper: get valid months for expiry (from issue month if same year)
  const getValidMonthsExpiry = (year: string | null, issueDate: { day: string | null; month: string | null; year: string | null } | undefined) => {
    if (!year || !issueDate?.year) return months;
    if (parseInt(year) === parseInt(issueDate.year)) {
      return months.filter((m) => issueDate.month ? parseInt(m) >= parseInt(issueDate.month) : months);
    }
    return months;
  };

  // Helper: get valid days for expiry (from issue day if same year+month)
  const getValidDaysExpiry = (year: string | null, month: string | null, issueDate: { day: string | null; month: string | null; year: string | null } | undefined) => {
    const validDays = getValidDays(year, month);
    if (!year || !month || !issueDate?.year || !issueDate?.month || !issueDate?.day) return validDays;
    if (parseInt(year) === parseInt(issueDate.year) && parseInt(month) === parseInt(issueDate.month)) {
      return validDays.filter((d) => parseInt(d) >= parseInt(issueDate.day!));
    }
    return validDays;
  };

  const addApplicant = () => {
    setApplicants([...applicants, { id: nextId, expanded: true, saved: false }]);
    setNextId(nextId + 1);
  };

  const deleteApplicant = (id: number) => {
    setApplicants(applicants.filter((a) => a.id !== id));
    setApplicantNames((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setPassportData((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const toggleExpand = (id: number) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, expanded: !a.expanded } : a)));
  };

  const saveApplicant = (id: number) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, saved: true, expanded: false } : a)));
  };

  const multipleApplicants = applicants.length > 1;
  const allApplicantsSaved = !multipleApplicants || applicants.every((a) => a.saved);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const isApplicantValid = (id: number) => {
    const name = applicantNames[id];
    const email = applicantEmails[id];
    const dob = applicantDOB[id];
    const gender = applicantGender[id];
    const country = applicantCountryOfBirth[id];
    return !!(
      name?.firstName?.trim() &&
      name?.lastName?.trim() &&
      email?.trim() &&
      isValidEmail(email) &&
      dob?.day &&
      dob?.month &&
      dob?.year &&
      gender &&
      country
    );
  };
  const allApplicantsValid = applicants.every((a) => isApplicantValid(a.id));
  const canGoToPassport = multipleApplicants ? allApplicantsSaved : allApplicantsValid;

  const goToPassportStep = () => {
    setPassportApplicants(applicants.map((a) => ({ id: a.id, expanded: true, saved: false, otherCitizen: "no" as const, prevApplied: "no" as const })));
    setCurrentStep(1);
  };

  const togglePassportExpand = (id: number) => {
    setPassportApplicants(passportApplicants.map((a) => (a.id === id ? { ...a, expanded: !a.expanded } : a)));
  };

  const deletePassportApplicant = (id: number) => {
    setPassportApplicants(passportApplicants.filter((a) => a.id !== id));
    setPassportData((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const savePassportApplicant = (id: number) => {
    setPassportApplicants(passportApplicants.map((a) => (a.id === id ? { ...a, saved: true, expanded: false } : a)));
  };

  const updatePassportField = (id: number, field: "otherCitizen" | "prevApplied", value: "yes" | "no") => {
    setPassportApplicants(passportApplicants.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const allPassportSaved = passportApplicants.length <= 1 || passportApplicants.every((a) => a.saved);

  const isPassportValid = (id: number) => {
    const data = passportData[id];
    return !!(
      data?.nationality &&
      data?.passportNumber?.trim() &&
      data?.dateIssue?.day &&
      data?.dateIssue?.month &&
      data?.dateIssue?.year &&
      data?.dateExpiry?.day &&
      data?.dateExpiry?.month &&
      data?.dateExpiry?.year
    );
  };
  const allPassportValid = passportApplicants.every((a) => isPassportValid(a.id));
  const canGoToImage = passportApplicants.length > 1 ? allPassportSaved : allPassportValid;

  const goToImageStep = () => {
    setImageApplicants(passportApplicants.map((a) => ({ id: a.id, expanded: true, saved: false })));
    setImageConsent({});
    setCurrentStep(2);
  };

  const toggleImageExpand = (id: number) => {
    setImageApplicants(imageApplicants.map((a) => (a.id === id ? { ...a, expanded: !a.expanded } : a)));
  };

  const deleteImageApplicant = (id: number) => {
    setImageApplicants(imageApplicants.filter((a) => a.id !== id));
    setImageConsent((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setPassportImages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const saveImageApplicant = (id: number) => {
    setImageApplicants(imageApplicants.map((a) => (a.id === id ? { ...a, saved: true, expanded: false } : a)));
  };

  const toggleImageConsent = (id: number) => {
    setImageConsent((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allImageConsented = imageApplicants.length > 0 && imageApplicants.every((a) => imageConsent[a.id]);
  const allImageUploaded = imageApplicants.length > 0 && imageApplicants.every((a) => passportImages[a.id]);
  const allImageSaved = imageApplicants.length <= 1 || imageApplicants.every((a) => a.saved);
  const canGoToPhoto = allImageConsented && allImageUploaded;

  const goToPhotoStep = () => {
    setPhotoApplicants(imageApplicants.map((a) => ({ id: a.id, expanded: true, saved: false })));
    setPhotoConsent({});
    setCurrentStep(3);
  };

  const togglePhotoExpand = (id: number) => {
    setPhotoApplicants(photoApplicants.map((a) => (a.id === id ? { ...a, expanded: !a.expanded } : a)));
  };

  const deletePhotoApplicant = (id: number) => {
    setPhotoApplicants(photoApplicants.filter((a) => a.id !== id));
    setPhotoConsent((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setPhotoImages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const savePhotoApplicant = (id: number) => {
    setPhotoApplicants(photoApplicants.map((a) => (a.id === id ? { ...a, saved: true, expanded: false } : a)));
  };

  const togglePhotoConsent = (id: number) => {
    setPhotoConsent((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allPhotoConsented = photoApplicants.length > 0 && photoApplicants.every((a) => photoConsent[a.id]);
  const allPhotoUploaded = photoApplicants.length > 0 && photoApplicants.every((a) => photoImages[a.id]);
  const allPhotoSaved = photoApplicants.length <= 1 || photoApplicants.every((a) => a.saved);
  const canGoToReview = allPhotoConsented && allPhotoUploaded;

  const goToReviewStep = () => {
    setCurrentStep(4);
  };

  const allReviewConsented = reviewConsent.confirmInfo && reviewConsent.privacyNotice;

  // Processing pricing logic
  const processingPackages = {
    standard: { total: 89.90, fee: 59.00, processing: 30.90, label: "2-5 Days processing" },
    express: { total: 119.90, fee: 89.00, processing: 30.90, label: "6-24h processing" },
    fastest: { total: 139.90, fee: 109.00, processing: 30.90, label: "1h processing" },
    testing: { total: 2.00, fee: 2.00, processing: 0.00, label: "Testing - $2 only" },
  };
  const selectedPackage = processingPackages[selectedProcessing];
  const applicantCount = applicants.length;
  const feeTotal = selectedPackage.fee * applicantCount;
  const processingTotal = selectedPackage.processing * applicantCount;
  const grandTotal = feeTotal + processingTotal;

  const { toasts, showToast, removeToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDateForApi = (d: { day: string | null; month: string | null; year: string | null } | undefined) => {
    if (!d || !d.day || !d.month || !d.year) return "";
    return `${d.year}-${d.month.padStart(2, "0")}-${d.day.padStart(2, "0")}`;
  };

  const buildPayload = () => {
    const applicantsData = applicants.map((app) => {
      const id = app.id;
      const names = applicantNames[id] || { firstName: "", lastName: "" };
      const passport = passportData[id] || {};
      const passportApp = passportApplicants.find((p) => p.id === id);

      return {
        firstName: names.firstName,
        lastName: names.lastName,
        email: applicantEmails[id] || "",
        phone: applicantPhones[id] || "",
        dateOfBirth: formatDateForApi(applicantDOB[id]),
        gender: applicantGender[id] || "",
        countryOfBirth: applicantCountryOfBirth[id]?.name || "",
        nationality: passport.nationality?.name || "",
        passportNumber: passport.passportNumber || "",
        passportIssueDate: formatDateForApi(passport.dateIssue),
        passportExpiryDate: formatDateForApi(passport.dateExpiry),
        dualCitizenship: passportApp?.otherCitizen === "yes",
        previouslyAppliedUk: passportApp?.prevApplied === "yes",
        passportImageUrl: passportImages[id] || "",
        personalPhotoUrl: photoImages[id] || "",
        imageConsent: imageConsent[id] || false,
        photoConsent: photoConsent[id] || false,
      };
    });

    return {
      applicants: applicantsData,
      processingType: selectedProcessing,
      confirmInfo: reviewConsent.confirmInfo,
      privacyNotice: reviewConsent.privacyNotice,
    };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const payload = buildPayload();
      const { url } = await api.createCheckoutSession(payload);
      // Redirect to Stripe Checkout — the application is only saved to the
      // database after Stripe confirms payment via webhook.
      window.location.href = url;
    } catch (err: any) {
      showToast(err.message || "Failed to start payment. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setApplicants([{ id: 1, expanded: true, saved: false }]);
    setNextId(2);
    setPassportApplicants([]);
    setImageApplicants([]);
    setImageConsent({});
    setPhotoApplicants([]);
    setPhotoConsent({});
    setApplicantNames({});
    setApplicantEmails({});
    setApplicantPhones({});
    setApplicantDOB({});
    setApplicantGender({});
    setApplicantCountryOfBirth({});
    setReviewConsent({ confirmInfo: false, privacyNotice: false });
    setPassportImages({});
    setPhotoImages({});
    setPassportData({});
    setSelectedProcessing("standard");
  };

  return (
    <main>
      <div ref={topRef} />
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px] hero-image-container" style={{ height: "245px" }}>
          <Image src={about} alt="Apply for eTA" fill className="object-cover" style={{ borderRadius: "16px" }} priority sizes="(max-width: 768px) 100vw, 1408px" loading="eager" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <button className="flex items-center justify-center rounded-full" style={{ width: "127px", height: "40px", gap: "16px", background: "transparent", border: "1px solid var(--hero-text)", color: "var(--hero-text)" }}>
              Apply for eTA
            </button>
            <div style={{ maxWidth: "697px", marginTop: "16px" }}>
              <h1 className="text-white text-center md:!text-[56px] md:!leading-[110%] md:!tracking-[-0.03em]" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "135%", letterSpacing: "-0.02em", textAlign: "center" }}>
                UK eTA Application
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto px-4 md:!px-10 md:!pt-[120px] md:!pb-[120px]" style={{ maxWidth: "1440px", paddingTop: "48px", paddingBottom: "48px" }}>
        <h2 className="text-center md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "120%", letterSpacing: "-0.03em", color: "var(--text-heading)", textAlign: "center" }}>
          {currentStep === 0 ? "Applicant Information" : currentStep === 1 ? "Passport Details" : currentStep === 2 ? "Passport Image" : currentStep === 3 ? "Your Photo" : currentStep === 4 ? "Review" : "Processing speed"}
        </h2>

        {/* Two divs with 32px gap */}
        <div className="flex flex-col lg:flex-row" style={{ gap: "32px", marginTop: "32px" }}>
          {/* Left div */}
          <div style={{ maxWidth: "898px", width: "100%", alignSelf: "flex-start", borderRadius: "24px", border: "1px solid var(--form-border)" }}>
            {/* Top section - bg #FAFAF9 */}
            <div style={{ background: "var(--form-bg)", padding: "24px", borderBottom: "1px solid var(--form-border)", borderTopLeftRadius: "24px", borderTopRightRadius: "24px" }}>
              <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginBottom: "12px" }}>
                Application · Step {currentStep + 1} of 6
              </p>
              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center" style={{ gap: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 600, lineHeight: "150%", letterSpacing: "-0.01em", color: index === currentStep ? "var(--primary)" : "var(--icon-muted)" }}>
                      {step}
                    </span>
                    {index < steps.length - 1 && (
                      <ChevronRight style={{ width: "24px", height: "24px", color: index < currentStep ? "var(--primary)" : "var(--icon-muted)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* White section */}
            <div style={{ background: "var(--card)", padding: "24px" }}>
              {currentStep === 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Applicants</h3>
                    <div style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
                      Number of travellers: <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>{applicants.length}</span>
                    </div>
                  </div>

                  {/* Applicant form cards */}
                  {applicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid var(--form-border)" }}>
                      {/* Blue header - bg #EFF6FF */}
                      <div style={{ background: "var(--form-header-bg)", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid var(--form-border)" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-body)" }}>Applicant {index + 1}</span>
                                <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Your information</span>
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "var(--text-body)" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            {applicants.length > 1 && (
                              <Trash2 style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => deleteApplicant(applicant.id)} />
                            )}
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => toggleExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => toggleExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section - bg #FAFAF9 */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "var(--form-bg)", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          {/* Check if you need an eTA */}
                          <div>
                            <label style={{ ...labelStyle }}>Check if you need an eTA <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <CountryDropdown placeholder="Select passport nationality" />
                            </div>
                            <p style={{ ...helperStyle, marginTop: "8px" }}>Used to check whether you need an eTA.</p>
                          </div>

                          {/* Email Address */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Email Address <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <input type="email" placeholder="john@gmail.com" style={{ ...fieldStyle, ...(showErrors && applicantEmails[applicant.id] && !isValidEmail(applicantEmails[applicant.id]) ? { border: "1px solid var(--error-text)" } : {}) }} value={applicantEmails[applicant.id] || ""} onChange={(e) => updateApplicantEmail(applicant.id, e.target.value)} />
                            </div>
                            {showErrors && applicantEmails[applicant.id] && !isValidEmail(applicantEmails[applicant.id]) && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Please enter a valid email address.</p>
                            )}
                            {showErrors && !applicantEmails[applicant.id]?.trim() && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Email address is required.</p>
                            )}
                            <p style={{ ...helperStyle, marginTop: "8px" }}>Used to send your approval confirmation and any updates about your application.</p>
                          </div>

                          {/* Phone Number */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Phone Number <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <input type="tel" placeholder="+1 234 567 8900" style={{ ...fieldStyle, ...(showErrors && !applicantPhones[applicant.id]?.trim() ? { border: "1px solid var(--error-text)" } : {}) }} value={applicantPhones[applicant.id] || ""} onChange={(e) => { const val = e.target.value.replace(/[^0-9+\s\-()]/g, ""); updateApplicantPhone(applicant.id, val); }} />
                            </div>
                            {showErrors && !applicantPhones[applicant.id]?.trim() && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Phone number is required.</p>
                            )}
                            {showErrors && applicantPhones[applicant.id]?.trim() && !/^[0-9+\s\-()]+$/.test(applicantPhones[applicant.id].trim()) && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Please enter a valid phone number (numbers only).</p>
                            )}
                            <p style={{ ...helperStyle, marginTop: "8px" }}>Used to contact you about your application if needed.</p>
                          </div>

                          {/* First name & Last name */}
                          <div style={{ marginTop: "24px", gap: "16px" }} className="flex flex-col md:flex-row">
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>First name(s) <span style={{ color: "#EF4444" }}>*</span></label>
                              <div style={{ marginTop: "8px" }}>
                                <input type="text" placeholder="As shown on your passport" style={{ ...fieldStyle, ...(showErrors && !applicantNames[applicant.id]?.firstName?.trim() ? { border: "1px solid var(--error-text)" } : {}) }} value={applicantNames[applicant.id]?.firstName || ""} onChange={(e) => updateApplicantName(applicant.id, "firstName", e.target.value)} />
                              </div>
                              {showErrors && !applicantNames[applicant.id]?.firstName?.trim() && (
                                <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>First name is required.</p>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Last name (surname) <span style={{ color: "#EF4444" }}>*</span></label>
                              <div style={{ marginTop: "8px" }}>
                                <input type="text" placeholder="As shown on your passport" style={{ ...fieldStyle, ...(showErrors && !applicantNames[applicant.id]?.lastName?.trim() ? { border: "1px solid var(--error-text)" } : {}) }} value={applicantNames[applicant.id]?.lastName || ""} onChange={(e) => updateApplicantName(applicant.id, "lastName", e.target.value)} />
                              </div>
                              {showErrors && !applicantNames[applicant.id]?.lastName?.trim() && (
                                <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Last name is required.</p>
                              )}
                            </div>
                          </div>

                          {/* Date of birth & Gender */}
                          <div style={{ marginTop: "24px", gap: "16px" }} className="flex flex-col md:flex-row">
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Date of birth <span style={{ color: "#EF4444" }}>*</span></label>
                              <div className="flex" style={{ gap: "8px", marginTop: "8px" }}>
                                <DateDropdown placeholder="DD" options={getValidDaysDOB(applicantDOB[applicant.id]?.year ?? null, applicantDOB[applicant.id]?.month ?? null)} label="Day" value={applicantDOB[applicant.id]?.day ?? null} onChange={(v) => updateApplicantDOB(applicant.id, "day", v)} />
                                <DateDropdown placeholder="MM" options={getValidMonthsDOB(applicantDOB[applicant.id]?.year ?? null)} label="Month" value={applicantDOB[applicant.id]?.month ?? null} onChange={(v) => { updateApplicantDOB(applicant.id, "month", v); if (applicantDOB[applicant.id]?.day && v) { const maxDay = new Date(parseInt(applicantDOB[applicant.id]?.year || String(currentYear)), parseInt(v), 0).getDate(); if (parseInt(applicantDOB[applicant.id].day!) > maxDay) updateApplicantDOB(applicant.id, "day", null); } }} />
                                <DateDropdown placeholder="YYYY" options={dobYears} label="Year" value={applicantDOB[applicant.id]?.year ?? null} onChange={(v) => { updateApplicantDOB(applicant.id, "year", v); if (applicantDOB[applicant.id]?.month && v && parseInt(v) === currentYear && parseInt(applicantDOB[applicant.id].month!) > parseInt(currentMonth)) updateApplicantDOB(applicant.id, "month", null); }} />
                              </div>
                              {showErrors && (!applicantDOB[applicant.id]?.day || !applicantDOB[applicant.id]?.month || !applicantDOB[applicant.id]?.year) && (
                                <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Date of birth is required.</p>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Gender<span style={{ color: "#EF4444" }}>*</span></label>
                              <div style={{ marginTop: "8px" }}>
                                <GenericDropdown placeholder="Select" options={["Male", "Female", "Other", "Prefer not to say"]} value={applicantGender[applicant.id] ?? null} onChange={(v) => updateApplicantGender(applicant.id, v)} />
                              </div>
                              {showErrors && !applicantGender[applicant.id] && (
                                <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Gender is required.</p>
                              )}
                            </div>
                          </div>

                          {/* Country of birth */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Country of birth <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <CountryDropdown placeholder="Select country" value={applicantCountryOfBirth[applicant.id] ?? null} onChange={(v) => updateApplicantCountryOfBirth(applicant.id, v)} />
                            </div>
                            {showErrors && !applicantCountryOfBirth[applicant.id] && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Country of birth is required.</p>
                            )}
                          </div>

                          {/* Save button */}
                          {multipleApplicants && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                disabled={!isApplicantValid(applicant.id)}
                                onClick={() => isApplicantValid(applicant.id) && saveApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: isApplicantValid(applicant.id) ? "var(--primary)" : "var(--form-border)",
                                  color: "var(--hero-text)",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: isApplicantValid(applicant.id) ? "pointer" : "not-allowed",
                                }}
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Applicant passport details</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                      Enter the details of the passport you will use to travel. The information must match the passport exactly.
                    </p>
                  </div>

                  {/* Passport form cards */}
                  {passportApplicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid var(--form-border)" }}>
                      {/* Blue header - bg #EFF6FF */}
                      <div style={{ background: "var(--form-header-bg)", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid var(--form-border)" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-body)" }}>Applicant {index + 1}</span>
                                <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Passport details</span>
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "var(--text-body)" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            {passportApplicants.length > 1 && (
                              <Trash2 style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => deletePassportApplicant(applicant.id)} />
                            )}
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section - bg #FAFAF9 */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "var(--form-bg)", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          {/* Nationality on passport */}
                          <div>
                            <label style={{ ...labelStyle }}>Nationality on passport <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <CountryDropdown placeholder="Select passport nationality" value={passportData[applicant.id]?.nationality ?? null} onChange={(v) => updatePassportData(applicant.id, "nationality", v)} />
                            </div>
                            {showErrors && !passportData[applicant.id]?.nationality && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Nationality is required.</p>
                            )}
                          </div>

                          {/* Passport number */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Passport number <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <input type="text" maxLength={20} placeholder="xxxxxxxxx" style={{ ...fieldStyle, ...(showErrors && !passportData[applicant.id]?.passportNumber?.trim() ? { border: "1px solid var(--error-text)" } : {}) }} value={passportData[applicant.id]?.passportNumber || ""} onChange={(e) => updatePassportData(applicant.id, "passportNumber", e.target.value)} />
                            </div>
                            {showErrors && !passportData[applicant.id]?.passportNumber?.trim() && (
                              <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Passport number is required.</p>
                            )}
                            <p style={{ ...helperStyle, marginTop: "8px" }}>Typically 8–11 characters. Use letters and numbers exactly as printed.</p>
                          </div>

                          {/* Date of issue & Date of expiry */}
                          <div style={{ marginTop: "24px", gap: "16px" }} className="flex flex-col md:flex-row">
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Date of issue <span style={{ color: "#EF4444" }}>*</span></label>
                              <div className="flex" style={{ gap: "8px", marginTop: "8px" }}>
                                <DateDropdown placeholder="DD" options={getValidDaysIssue(passportData[applicant.id]?.dateIssue?.year ?? null, passportData[applicant.id]?.dateIssue?.month ?? null)} label="Day" value={passportData[applicant.id]?.dateIssue?.day ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateIssue", "day", v)} />
                                <DateDropdown placeholder="MM" options={getValidMonthsIssue(passportData[applicant.id]?.dateIssue?.year ?? null)} label="Month" value={passportData[applicant.id]?.dateIssue?.month ?? null} onChange={(v) => { updatePassportDateField(applicant.id, "dateIssue", "month", v); if (passportData[applicant.id]?.dateIssue?.day && v) { const maxDay = new Date(parseInt(passportData[applicant.id]?.dateIssue?.year || String(currentYear)), parseInt(v), 0).getDate(); if (parseInt(passportData[applicant.id].dateIssue!.day!) > maxDay) updatePassportDateField(applicant.id, "dateIssue", "day", null); } }} />
                                <DateDropdown placeholder="YYYY" options={issueYears} label="Year" value={passportData[applicant.id]?.dateIssue?.year ?? null} onChange={(v) => { updatePassportDateField(applicant.id, "dateIssue", "year", v); if (passportData[applicant.id]?.dateIssue?.month && v && parseInt(v) === currentYear && parseInt(passportData[applicant.id].dateIssue!.month!) > parseInt(currentMonth)) updatePassportDateField(applicant.id, "dateIssue", "month", null); }} />
                              </div>
                              {showErrors && (!passportData[applicant.id]?.dateIssue?.day || !passportData[applicant.id]?.dateIssue?.month || !passportData[applicant.id]?.dateIssue?.year) && (
                                <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Date of issue is required.</p>
                              )}
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Date of expiry <span style={{ color: "#EF4444" }}>*</span></label>
                              <div className="flex" style={{ gap: "8px", marginTop: "8px" }}>
                                <DateDropdown placeholder="DD" options={getValidDaysExpiry(passportData[applicant.id]?.dateExpiry?.year ?? null, passportData[applicant.id]?.dateExpiry?.month ?? null, passportData[applicant.id]?.dateIssue)} label="Day" value={passportData[applicant.id]?.dateExpiry?.day ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateExpiry", "day", v)} />
                                <DateDropdown placeholder="MM" options={getValidMonthsExpiry(passportData[applicant.id]?.dateExpiry?.year ?? null, passportData[applicant.id]?.dateIssue)} label="Month" value={passportData[applicant.id]?.dateExpiry?.month ?? null} onChange={(v) => { updatePassportDateField(applicant.id, "dateExpiry", "month", v); if (passportData[applicant.id]?.dateExpiry?.day && v) { const maxDay = new Date(parseInt(passportData[applicant.id]?.dateExpiry?.year || String(currentYear)), parseInt(v), 0).getDate(); if (parseInt(passportData[applicant.id].dateExpiry!.day!) > maxDay) updatePassportDateField(applicant.id, "dateExpiry", "day", null); } }} />
                                <DateDropdown placeholder="YYYY" options={expiryYears} label="Year" value={passportData[applicant.id]?.dateExpiry?.year ?? null} onChange={(v) => { updatePassportDateField(applicant.id, "dateExpiry", "year", v); const issue = passportData[applicant.id]?.dateIssue; if (issue?.year && v && parseInt(v) < parseInt(issue.year)) { updatePassportDateField(applicant.id, "dateExpiry", "year", null); updatePassportDateField(applicant.id, "dateExpiry", "month", null); updatePassportDateField(applicant.id, "dateExpiry", "day", null); } else if (issue?.year && issue?.month && v && parseInt(v) === parseInt(issue.year) && parseInt(issue.month) > parseInt(passportData[applicant.id]?.dateExpiry?.month || "13")) { updatePassportDateField(applicant.id, "dateExpiry", "month", null); updatePassportDateField(applicant.id, "dateExpiry", "day", null); } }} />
                              </div>
                              {showErrors && (!passportData[applicant.id]?.dateExpiry?.day || !passportData[applicant.id]?.dateExpiry?.month || !passportData[applicant.id]?.dateExpiry?.year) && (
                                <p style={{ ...helperStyle, marginTop: "4px", color: "var(--error-text)" }}>Date of expiry is required.</p>
                              )}
                            </div>
                          </div>

                          {/* Are you a citizen of any other country? */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Are you a citizen of any other country?</label>
                            <YesNoToggle value={applicant.otherCitizen} onChange={(v) => updatePassportField(applicant.id, "otherCitizen", v)} />
                            {applicant.otherCitizen === "yes" && (
                              <div style={{ marginTop: "16px" }}>
                                <label style={{ ...labelStyle }}>What is your other nationality? <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ marginTop: "8px" }}>
                                  <CountryDropdown placeholder="Select country" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Have you previously applied for or been issued a UK visa, eTA, or permit? */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Have you previously applied for or been issued a UK visa, eTA, or permit? <span style={{ color: "#EF4444" }}>*</span></label>
                            <YesNoToggle value={applicant.prevApplied} onChange={(v) => updatePassportField(applicant.id, "prevApplied", v)} />
                          </div>

                          {/* Save button */}
                          {passportApplicants.length > 1 && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                disabled={!isPassportValid(applicant.id)}
                                onClick={() => isPassportValid(applicant.id) && savePassportApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: isPassportValid(applicant.id) ? "var(--primary)" : "var(--form-border)",
                                  color: "var(--hero-text)",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: isPassportValid(applicant.id) ? "pointer" : "not-allowed",
                                }}
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Photo of your passport</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                      You must provide a photo of your physical passport. Your application may be rejected if you upload or take a photo of a digital passport.
                    </p>
                  </div>

                  {imageApplicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid var(--form-border)" }}>
                      {/* Blue header */}
                      <div style={{ background: "var(--form-header-bg)", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid var(--form-border)" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-body)" }}>Applicant {index + 1}</span>
                                {applicantNames[applicant.id]?.firstName || applicantNames[applicant.id]?.lastName ? (
                                  <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>{getApplicantName(applicant.id)}</span>
                                ) : null}
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "var(--text-body)" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            {imageApplicants.length > 1 && (
                              <Trash2 style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => deleteImageApplicant(applicant.id)} />
                            )}
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => toggleImageExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => toggleImageExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "var(--form-bg)", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          {/* The passport photo must clearly show: */}
                          <div className="flex flex-col sm:flex-row" style={{ gap: "16px", alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                                The passport photo must clearly show:
                              </p>
                              <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                                <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>All four corners of the passport&apos;s personal details page</li>
                                <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Your personal details</li>
                                <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>The Machine Readable Zone (MRZ) at the bottom of the personal details page (2–3 lines of letters, numbers, and symbols)</li>
                              </ul>
                            </div>
                            <div style={{ flexShrink: 0 }}>
                              <Image src={pasport1} alt="Passport example" width={220} height={128} style={{ maxWidth: "219.6px", height: "128px", borderRadius: "8px" }} />
                            </div>
                          </div>

                          {/* The photo must be: */}
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "24px" }}>
                            The photo must be:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Clear and in focus</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Free from glare and reflections</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Unedited (no filters or effects)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Original image (not a screenshot or photocopy)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>In colour</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Landscape orientation</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Minimum resolution: 600 × 750 px</li>
                          </ul>

                          {/* Upload area */}
                          {passportImages[applicant.id] ? (
                            <div style={{ marginTop: "24px", maxWidth: "802px", width: "100%", borderRadius: "16px", border: "1px solid var(--form-border)", background: "var(--input-bg)", padding: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                              <img src={passportImages[applicant.id]} alt="Passport preview" style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-heading)" }}>Passport image uploaded</p>
                                <p style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-body)", marginTop: "4px" }}>Click the trash icon to replace the image</p>
                              </div>
                              <button
                                onClick={() => setPassportImages((prev) => { const next = { ...prev }; delete next[applicant.id]; return next; })}
                                className="flex items-center justify-center"
                                style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--form-border)", background: "var(--card)", cursor: "pointer", flexShrink: 0 }}
                              >
                                <Trash2 style={{ width: "18px", height: "18px", color: "var(--icon-muted)" }} />
                              </button>
                            </div>
                          ) : (
                            <div
                              className="upload-area-desktop"
                              style={{ marginTop: "24px", maxWidth: "802px", width: "100%", height: "192px", border: dragOverApplicant === applicant.id ? "2px dashed var(--primary)" : "1px dashed var(--form-border)", borderRadius: "16px", padding: "24px", background: "var(--input-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", transition: "border 0.2s" }}
                              onDragOver={(e) => { e.preventDefault(); setDragOverApplicant(applicant.id); }}
                              onDragLeave={() => setDragOverApplicant(null)}
                              onDrop={(e) => handleDrop(applicant.id, e, "passport")}
                            >
                              <Image src={uploadIcon} alt="Upload" width={42} height={42} style={{ width: "42px", height: "42px" }} />
                              <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", textAlign: "center" }}>
                                Drag your file(s) to start uploading
                              </p>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                                <div style={{ width: "79px", height: "1px", background: "var(--form-border)" }} />
                                <span style={{ fontSize: "12px", fontWeight: 400, lineHeight: "165%", color: "var(--placeholder-text)", textAlign: "center" }}>OR</span>
                                <div style={{ width: "79px", height: "1px", background: "var(--form-border)" }} />
                              </div>
                              <label
                                className="flex items-center justify-center"
                                style={{
                                  width: "160px",
                                  height: "32px",
                                  gap: "8px",
                                  paddingTop: "6px",
                                  paddingRight: "12px",
                                  paddingBottom: "6px",
                                  paddingLeft: "12px",
                                  borderRadius: "999px",
                                  background: "var(--primary)",
                                  color: "var(--hero-text)",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                <Upload style={{ width: "16px", height: "16px" }} />
                                Upload Images
                                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileInput(applicant.id, e, "passport")} />
                              </label>
                            </div>
                          )}
                          {/* Mobile upload button */}
                          <label
                            className="upload-area-mobile flex items-center justify-center w-full"
                            style={{
                              marginTop: "24px",
                              height: "48px",
                              gap: "8px",
                              borderRadius: "999px",
                              background: "var(--primary)",
                              color: "var(--hero-text)",
                              fontSize: "16px",
                              fontWeight: 500,
                              cursor: "pointer",
                              display: "none",
                            }}
                          >
                            <Upload style={{ width: "20px", height: "20px" }} />
                            Upload Image
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileInput(applicant.id, e, "passport")} />
                          </label>

                          {/* File format note */}
                          <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-body)", marginTop: "16px" }}>
                            File format (optional): we recommend using a JPG or JPEG file format. Maximum size: {MAX_IMAGE_SIZE_MB}MB.
                          </p>

                          {/* Upload error */}
                          {imageErrors[applicant.id] && (
                            <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--error-text)", marginTop: "8px" }}>
                              {imageErrors[applicant.id]}
                            </p>
                          )}

                          {/* Consent checkbox */}
                          <div className="flex items-start" style={{ gap: "12px", marginTop: "16px" }}>
                            <div
                              onClick={() => toggleImageConsent(applicant.id)}
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "6px",
                                border: imageConsent[applicant.id] ? "2px solid var(--primary)" : "1px solid var(--form-border)",
                                background: imageConsent[applicant.id] ? "var(--primary)" : "var(--input-bg)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                cursor: "pointer",
                                marginTop: "2px",
                              }}
                            >
                              {imageConsent[applicant.id] && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                            </div>
                            <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-body)" }}>
                              I consent to the secure collection and processing of my biometric data (passport photo and selfie) solely for my UKVI application. My data will be permanently deleted from our system within 10 days.
                            </p>
                          </div>

                          {/* Save button */}
                          {imageApplicants.length > 1 && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                disabled={!passportImages[applicant.id] || !imageConsent[applicant.id]}
                                onClick={() => passportImages[applicant.id] && imageConsent[applicant.id] && saveImageApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: passportImages[applicant.id] && imageConsent[applicant.id] ? "var(--primary)" : "var(--form-border)",
                                  color: "var(--hero-text)",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: passportImages[applicant.id] && imageConsent[applicant.id] ? "pointer" : "not-allowed",
                                }}
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Photo of yourself</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                      You must provide a live photo of yourself. Do not upload a screenshot, scanned image, or another person&apos;s photo.
                    </p>
                  </div>

                  {photoApplicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid var(--form-border)" }}>
                      {/* Blue header */}
                      <div style={{ background: "var(--form-header-bg)", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid var(--form-border)" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-body)" }}>Applicant {index + 1}</span>
                                {applicantNames[applicant.id]?.firstName || applicantNames[applicant.id]?.lastName ? (
                                  <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>{getApplicantName(applicant.id)}</span>
                                ) : null}
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "var(--text-body)" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            {photoApplicants.length > 1 && (
                              <Trash2 style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => deletePhotoApplicant(applicant.id)} />
                            )}
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => togglePhotoExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => togglePhotoExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "var(--form-bg)", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                            Make sure you have:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Plain, light-colored background (e.g., a white wall)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>No people or objects in the background</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Head, shoulders, and upper body fully visible</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Position yourself at a comfortable distance from the camera</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Even lighting with no shadows or glare on your face or background</li>
                          </ul>

                          {/* You must not: */}
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "24px" }}>
                            You must not:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Do not cover your face or eyes</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Head coverings are only permitted for religious or medical reasons</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Do not wear fashion hair accessories that cover your face</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Avoid excessive makeup</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Do not wear glasses; your eyes must be fully visible and open</li>
                          </ul>

                          {/* The photo must be: */}
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "24px" }}>
                            The photo must be:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Different from your passport photo</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Recently taken (take the photo now)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Portrait orientation</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>In colour</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Minimum resolution: 600 × 750 px</li>
                          </ul>

                          {/* Upload area */}
                          {photoImages[applicant.id] ? (
                            <div style={{ marginTop: "24px", maxWidth: "802px", width: "100%", borderRadius: "16px", border: "1px solid var(--form-border)", background: "var(--input-bg)", padding: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                              <img src={photoImages[applicant.id]} alt="Photo preview" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "16px", fontWeight: 500, color: "var(--text-heading)" }}>Photo uploaded</p>
                                <p style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-body)", marginTop: "4px" }}>Click the trash icon to replace the photo</p>
                              </div>
                              <button
                                onClick={() => setPhotoImages((prev) => { const next = { ...prev }; delete next[applicant.id]; return next; })}
                                className="flex items-center justify-center"
                                style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid var(--form-border)", background: "var(--card)", cursor: "pointer", flexShrink: 0 }}
                              >
                                <Trash2 style={{ width: "18px", height: "18px", color: "var(--icon-muted)" }} />
                              </button>
                            </div>
                          ) : (
                            <div
                              className="upload-area-desktop"
                              style={{ marginTop: "24px", maxWidth: "802px", width: "100%", height: "192px", border: dragOverApplicant === applicant.id ? "2px dashed var(--primary)" : "1px dashed var(--form-border)", borderRadius: "16px", padding: "24px", background: "var(--input-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", transition: "border 0.2s" }}
                              onDragOver={(e) => { e.preventDefault(); setDragOverApplicant(applicant.id); }}
                              onDragLeave={() => setDragOverApplicant(null)}
                              onDrop={(e) => handleDrop(applicant.id, e, "photo")}
                            >
                              <Image src={uploadIcon} alt="Upload" width={42} height={42} style={{ width: "42px", height: "42px" }} />
                              <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", textAlign: "center" }}>
                                Drag your file(s) to start uploading
                              </p>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                                <div style={{ width: "79px", height: "1px", background: "var(--form-border)" }} />
                                <span style={{ fontSize: "12px", fontWeight: 400, lineHeight: "165%", color: "var(--placeholder-text)", textAlign: "center" }}>OR</span>
                                <div style={{ width: "79px", height: "1px", background: "var(--form-border)" }} />
                              </div>
                              <label
                                className="flex items-center justify-center"
                                style={{
                                  width: "160px",
                                  height: "32px",
                                  gap: "8px",
                                  paddingTop: "6px",
                                  paddingRight: "12px",
                                  paddingBottom: "6px",
                                  paddingLeft: "12px",
                                  borderRadius: "999px",
                                  background: "var(--primary)",
                                  color: "var(--hero-text)",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                <Upload style={{ width: "16px", height: "16px" }} />
                                Upload Images
                                <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileInput(applicant.id, e, "photo")} />
                              </label>
                            </div>
                          )}
                          {/* Mobile upload button */}
                          <label
                            className="upload-area-mobile flex items-center justify-center w-full"
                            style={{
                              marginTop: "24px",
                              height: "48px",
                              gap: "8px",
                              borderRadius: "999px",
                              background: "var(--primary)",
                              color: "var(--hero-text)",
                              fontSize: "16px",
                              fontWeight: 500,
                              cursor: "pointer",
                              display: "none",
                            }}
                          >
                            <Upload style={{ width: "20px", height: "20px" }} />
                            Upload Image
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFileInput(applicant.id, e, "photo")} />
                          </label>

                          {/* File format note */}
                          <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-body)", marginTop: "16px" }}>
                            File format (optional): we recommend using a JPG or JPEG file format. Maximum size: {MAX_IMAGE_SIZE_MB}MB.
                          </p>

                          {/* Upload error */}
                          {imageErrors[applicant.id] && (
                            <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--error-text)", marginTop: "8px" }}>
                              {imageErrors[applicant.id]}
                            </p>
                          )}

                          {/* Consent checkbox */}
                          <div className="flex items-start" style={{ gap: "12px", marginTop: "16px" }}>
                            <div
                              onClick={() => togglePhotoConsent(applicant.id)}
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "6px",
                                border: photoConsent[applicant.id] ? "2px solid var(--primary)" : "1px solid var(--form-border)",
                                background: photoConsent[applicant.id] ? "var(--primary)" : "var(--input-bg)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                cursor: "pointer",
                                marginTop: "2px",
                              }}
                            >
                              {photoConsent[applicant.id] && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                            </div>
                            <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-body)" }}>
                              I consent to the secure collection and processing of my biometric data (passport photo and selfie) solely for my UKVI application. My data will be permanently deleted from our system within 10 days.
                            </p>
                          </div>

                          {/* Save button */}
                          {photoApplicants.length > 1 && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                disabled={!photoImages[applicant.id] || !photoConsent[applicant.id]}
                                onClick={() => photoImages[applicant.id] && photoConsent[applicant.id] && savePhotoApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: photoImages[applicant.id] && photoConsent[applicant.id] ? "var(--primary)" : "var(--form-border)",
                                  color: "var(--hero-text)",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: photoImages[applicant.id] && photoConsent[applicant.id] ? "pointer" : "not-allowed",
                                }}
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Applicants</h3>
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
                      Number of travellers: {applicants.length}
                    </span>
                  </div>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Please review the details below carefully. Once you pay, the information will be submitted for processing.
                  </p>

                  {applicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid var(--form-border)" }}>
                      {/* Header */}
                      <div style={{ background: "var(--form-header-bg)", padding: "16px 24px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                        <div className="flex items-center" style={{ gap: "12px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                            {index + 1}
                          </div>
                          <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                            {getApplicantName(applicant.id)}
                          </span>
                        </div>
                      </div>

                      {/* Personal Information section */}
                      <div style={{ padding: "24px" }}>
                        <div style={{ borderBottom: "1px solid var(--form-border)", paddingBottom: "16px", marginBottom: "16px" }}>
                          <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Personal Information</p>
                        </div>

                        {/* Email / First name / Last name */}
                        <div className="flex flex-col md:flex-row" style={{ gap: "24px" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Email:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{applicantEmails[applicant.id] || "-"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>First name:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{applicantNames[applicant.id]?.firstName || "-"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Last name:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{applicantNames[applicant.id]?.lastName || "-"}</p>
                          </div>
                        </div>

                        {/* DOB / Gender / Country of birth */}
                        <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "16px" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Date of birth:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{formatDate(applicantDOB[applicant.id])}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Gender:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{applicantGender[applicant.id] || "-"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Country of birth:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{applicantCountryOfBirth[applicant.id]?.name || "-"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ borderTop: "1px solid var(--form-border)", margin: "0 24px" }} />

                      {/* Passport & Personal Photo */}
                      <div style={{ padding: "24px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginBottom: "16px" }}>Passport &amp; Personal Photo</p>
                        <div className="flex" style={{ gap: "24px" }}>
                          <div style={{ width: "139px", height: "100px", borderRadius: "8px", border: "1px dashed var(--form-border)", background: "var(--form-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                            {passportImages[applicant.id] ? (
                              <img src={passportImages[applicant.id]} alt="Passport" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <Upload style={{ width: "24px", height: "24px", color: "var(--icon-muted)" }} />
                            )}
                          </div>
                          <div style={{ width: "100px", height: "100px", borderRadius: "8px", border: "1px dashed var(--form-border)", background: "var(--form-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                            {photoImages[applicant.id] ? (
                              <img src={photoImages[applicant.id]} alt="Personal photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <Upload style={{ width: "24px", height: "24px", color: "var(--icon-muted)" }} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ borderTop: "1px solid var(--form-border)", margin: "0 24px" }} />

                      {/* Passport Information */}
                      <div style={{ padding: "24px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginBottom: "16px" }}>Personal Information</p>

                        {/* Nationality / Document number / Issued */}
                        <div className="flex flex-col md:flex-row" style={{ gap: "24px" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Nationality:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{passportData[applicant.id]?.nationality?.name || "-"}</p>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "16px" }}>Expires:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{formatDate(passportData[applicant.id]?.dateExpiry)}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Document number:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{passportData[applicant.id]?.passportNumber || "-"}</p>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "16px" }}>Dual citizenship:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{passportApplicants.find((a) => a.id === applicant.id)?.otherCitizen === "yes" ? "Yes" : "No"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>Issued:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>{formatDate(passportData[applicant.id]?.dateIssue)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Consent & declaration */}
                  <div style={{ marginTop: "32px" }}>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Consent &amp; declaration</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                      Please read and agree to the declarations below. Both are required before your application can be submitted.
                    </p>
                  </div>

                  {/* Checkbox 1 */}
                  <div className="flex items-start" style={{ gap: "12px", marginTop: "24px" }}>
                    <div
                      onClick={() => setReviewConsent((prev) => ({ ...prev, confirmInfo: !prev.confirmInfo }))}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "6px",
                        border: reviewConsent.confirmInfo ? "2px solid var(--primary)" : "1px solid var(--form-border)",
                        background: reviewConsent.confirmInfo ? "var(--primary)" : "var(--input-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        marginTop: "2px",
                      }}
                    >
                      {reviewConsent.confirmInfo && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      I confirm that the information I have provided is true, complete, and accurate. I understand that incorrect or incomplete information may delay my application or lead to it being refused, and that approval does not by itself guarantee entry, which is decided by a border officer on arrival.*
                    </p>
                  </div>

                  {/* Checkbox 2 */}
                  <div className="flex items-start" style={{ gap: "12px", marginTop: "16px" }}>
                    <div
                      onClick={() => setReviewConsent((prev) => ({ ...prev, privacyNotice: !prev.privacyNotice }))}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "6px",
                        border: reviewConsent.privacyNotice ? "2px solid var(--primary)" : "1px solid var(--form-border)",
                        background: reviewConsent.privacyNotice ? "var(--primary)" : "var(--input-bg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        marginTop: "2px",
                      }}
                    >
                      {reviewConsent.privacyNotice && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      I consent to the processing of my personal data as described in the Privacy Notice, and I confirm that I have read and accept the Terms &amp; Conditions. I acknowledge that Service eVisa is a private, independent provider and is not affiliated with the United Kingdom government, that a service fee is charged in addition to the government fee, and that I may apply directly through the official United Kingdom government website. *
                    </p>
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Processing speed</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                      Choose your processing speed and pay securely to submit your application.
                    </p>
                  </div>

                  {/* Option 1: 2-5 Days processing */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid var(--form-border)", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "var(--card)" }}
                    onClick={() => setSelectedProcessing("standard")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "standard" ? "2px solid var(--primary)" : "2px solid var(--form-border)", background: selectedProcessing === "standard" ? "var(--primary)" : "var(--input-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "standard" && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                    </div>
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>2-5 Days processing</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "4px" }}>$89.90</p>
                    </div>
                  </div>

                  {/* Option 2: 6-24h processing */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid var(--form-border)", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "var(--card)" }}
                    onClick={() => setSelectedProcessing("express")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "express" ? "2px solid var(--primary)" : "2px solid var(--form-border)", background: selectedProcessing === "express" ? "var(--primary)" : "var(--input-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "express" && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                    </div>
                    <div>
                      <div className="flex items-center" style={{ gap: "10px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>6-24h processing</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", height: "30px", borderRadius: "99px", paddingTop: "4px", paddingRight: "8px", paddingBottom: "4px", paddingLeft: "8px", background: "var(--success-bg)", fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--success-text)" }}>
                          Popular
                        </span>
                      </div>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "4px" }}>$119.90</p>
                    </div>
                  </div>

                  {/* Option 3: 1h processing */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid var(--form-border)", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "var(--card)" }}
                    onClick={() => setSelectedProcessing("fastest")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "fastest" ? "2px solid var(--primary)" : "2px solid var(--form-border)", background: selectedProcessing === "fastest" ? "var(--primary)" : "var(--input-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "fastest" && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                    </div>
                    <div>
                      <div className="flex items-center" style={{ gap: "10px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>1h processing</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", height: "30px", borderRadius: "99px", paddingTop: "4px", paddingRight: "8px", paddingBottom: "4px", paddingLeft: "8px", background: "var(--accent-bg)", fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--info-text)" }}>
                          Fastest
                        </span>
                      </div>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "4px" }}>$139.90</p>
                    </div>
                  </div>

                  {/* Option 4: Testing - $2 only */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid var(--form-border)", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "var(--card)" }}
                    onClick={() => setSelectedProcessing("testing")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "testing" ? "2px solid var(--primary)" : "2px solid var(--form-border)", background: selectedProcessing === "testing" ? "var(--primary)" : "var(--input-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "testing" && <Check style={{ width: "16px", height: "16px", color: "var(--hero-text)" }} />}
                    </div>
                    <div>
                      <div className="flex items-center" style={{ gap: "10px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Testing - $2 only</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", height: "30px", borderRadius: "99px", paddingTop: "4px", paddingRight: "8px", paddingBottom: "4px", paddingLeft: "8px", background: "var(--warning-bg)", fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "var(--warning-text)" }}>
                          Test
                        </span>
                      </div>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)", marginTop: "4px" }}>$2.00</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {currentStep === 0 && (
              <div style={{ padding: "24px", background: "var(--card)" }}>
                <button
                  onClick={addApplicant}
                  className="flex items-center justify-center"
                  style={{
                    width: "100%",
                    height: "56px",
                    gap: "8px",
                    borderRadius: "99px",
                    border: "1px dashed var(--form-border)",
                    padding: "16px",
                    background: "var(--accent-bg)",
                    color: "var(--primary)",
                    fontSize: "16px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  <Plus style={{ width: "24px", height: "24px" }} />
                  Add Another Traveller
                </button>
              </div>
            )}
            {/* Bottom section with border top */}
            <div className="flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-4" style={{ borderTop: "1px solid var(--form-border)", padding: "24px", background: "var(--card)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}>
              {currentStep === 0 ? (
                <>
                  <p className="order-2 md:order-1" style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", textAlign: "center" }}>
                    Each traveller requires a separate authorization.
                  </p>
                  <button
                    disabled={!canGoToPassport}
                    onClick={() => {
                      if (!allApplicantsValid) { setShowErrors(true); return; }
                      if (canGoToPassport) goToPassportStep();
                    }}
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: canGoToPassport ? "var(--primary)" : "var(--form-border)",
                      color: "var(--hero-text)",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: canGoToPassport ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to passport details
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 1 ? (
                <>
                  <button
                    onClick={() => { setShowErrors(false); setCurrentStep(0); }}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "var(--card)",
                      border: "1px solid var(--form-border)",
                      color: "var(--primary)",
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowLeft style={{ width: "20px", height: "20px" }} />
                    Back
                  </button>
                  <button
                    disabled={!canGoToImage}
                    onClick={() => {
                      if (!allPassportValid) { setShowErrors(true); return; }
                      if (canGoToImage) goToImageStep();
                    }}
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: canGoToImage ? "var(--primary)" : "var(--form-border)",
                      color: "var(--hero-text)",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: canGoToImage ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to passport image
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 2 ? (
                <>
                  <button
                    onClick={() => { setShowErrors(false); setCurrentStep(1); }}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "var(--card)",
                      border: "1px solid var(--form-border)",
                      color: "var(--primary)",
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowLeft style={{ width: "20px", height: "20px" }} />
                    Back
                  </button>
                  <button
                    disabled={!canGoToPhoto}
                    onClick={canGoToPhoto ? goToPhotoStep : undefined}
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: canGoToPhoto ? "var(--primary)" : "var(--form-border)",
                      color: "var(--hero-text)",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: canGoToPhoto ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to your image
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 3 ? (
                <>
                  <button
                    onClick={() => { setShowErrors(false); setCurrentStep(2); }}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "var(--card)",
                      border: "1px solid var(--form-border)",
                      color: "var(--primary)",
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowLeft style={{ width: "20px", height: "20px" }} />
                    Back
                  </button>
                  <button
                    disabled={!canGoToReview}
                    onClick={canGoToReview ? goToReviewStep : undefined}
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: canGoToReview ? "var(--primary)" : "var(--form-border)",
                      color: "var(--hero-text)",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: canGoToReview ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to review
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 4 ? (
                <>
                  <button
                    onClick={() => { setShowErrors(false); setCurrentStep(3); }}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "var(--card)",
                      border: "1px solid var(--form-border)",
                      color: "var(--primary)",
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowLeft style={{ width: "20px", height: "20px" }} />
                    Back
                  </button>
                  <button
                    disabled={!allReviewConsented}
                    onClick={() => allReviewConsented && setCurrentStep(5)}
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: allReviewConsented ? "var(--primary)" : "var(--form-border)",
                      color: "var(--hero-text)",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: allReviewConsented ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to payment
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 5 ? (
                <>
                  <button
                    onClick={() => { setShowErrors(false); setCurrentStep(4); }}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "var(--card)",
                      border: "1px solid var(--form-border)",
                      color: "var(--primary)",
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowLeft style={{ width: "20px", height: "20px" }} />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: isSubmitting ? "var(--form-border)" : "var(--primary)",
                      color: "var(--hero-text)",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? "Processing..." : "Pay & Submit"}
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {/* Right div */}
          {currentStep !== 5 && (
          <div className="w-full md:w-auto" style={{ flex: 1, maxWidth: "442px", alignSelf: "flex-start", borderRadius: "24px", border: "1px solid var(--form-border)", background: "var(--card)", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            {currentStep === 0 ? (
              <>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    UK eTA Application
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Electronic Travel Authorization
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Travel document required to enter the United Kingdom
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Valid for up to 2 years and electronically linked to the holder&apos;s passport
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Permits multiple short visits to the UK — up to 6 months per entry
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Each traveller requires a separate authorization
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Your application is checked before submission. Approval is sent to the email address you provide.
                  </p>
                </div>
              </>
            ) : currentStep === 1 ? (
              <>
                <div style={{ background: "var(--form-bg)", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid var(--form-border)" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    UK eTA · Summary
                  </h3>
                </div>

                {passportApplicants.map((applicant, index) => (
                  <div key={applicant.id}>
                    {index > 0 && (
                      <div style={{ borderTop: "1px solid var(--form-border)", margin: "0 -24px 24px -24px" }} />
                    )}

                    {/* Applicant header with number, name, and chevron */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center" style={{ gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                          {index + 1}
                        </div>
                        <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                          {getApplicantName(applicant.id)}
                        </span>
                      </div>
                      {applicant.expanded ? (
                        <ChevronUp style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                      ) : (
                        <ChevronDown style={{ width: "24px", height: "24px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                      )}
                    </div>

                    {/* Document no & Type row */}
                    <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
                          Document no:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>
                          {passportData[applicant.id]?.passportNumber || "-"}
                        </p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
                          Type:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>
                          {passportData[applicant.id]?.nationality ? "Passport" : "-"}
                        </p>
                      </div>
                    </div>

                    {/* Issued & Expires row */}
                    <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
                          Issued:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>
                          {formatDate(passportData[applicant.id]?.dateIssue)}
                        </p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)" }}>
                          Expires:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginTop: "4px" }}>
                          {formatDate(passportData[applicant.id]?.dateExpiry)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : currentStep === 2 ? (
              <>
                <div style={{ background: "var(--form-bg)", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid var(--form-border)" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    Image Guide
                  </h3>
                </div>

                {/* Row 1: p1 + p2 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={p1} alt="Example 1" width={183} height={131} className="guide-img" style={{ borderRadius: "8px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        The image is not acceptable: it is out of focus or blurred.
                      </p>
                    </div>
                  </div>
                  <div className="guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={p2} alt="Example 2" width={183} height={131} className="guide-img" style={{ borderRadius: "8px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        The image is not acceptable: there is glare or light reflection
                      </p>
                    </div>
                  </div>
                </div>

                {/* p3 image with caption below */}
                <div className="guide-img-item" style={{ maxWidth: "183px" }}>
                  <Image src={p3} alt="Example 3" width={183} height={131} className="guide-img" style={{ borderRadius: "8px" }} />
                  <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                    <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                      The image is not acceptable: it is visible and in frame.
                    </p>
                  </div>
                </div>
              </>
            ) : currentStep === 3 ? (
              <>
                <div style={{ background: "var(--form-bg)", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid var(--form-border)" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    Image Guide
                  </h3>
                </div>

                {/* Row 1: r1 + r2 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r1} alt="Example 1" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Head-and-shoulders photo on a plain, light background
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r2} alt="Example 2" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Head-and-shoulders photo with objects in the background
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 2: r3 + r4 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r3} alt="Example 3" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Head-and-shoulders photo with even lighting
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r4} alt="Example 4" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Head-and-shoulders photo with a shadow behind them
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 3: r5 + r6 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r5} alt="Example 5" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Photo of a person&apos;s wearing religious headwear
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r6} alt="Example 6" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Photo of a person&apos;s wearing fashion hair accessory
                      </p>
                    </div>
                  </div>
                </div>

                {/* Row 4: r7 + r8 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r7} alt="Example 7" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Head-and-shoulders photo with eyes clearly visible
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r8} alt="Example 8" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "var(--text-heading)" }}>
                        Head-and-shoulders photo of a person wearing glasses that cover their eyes
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : currentStep === 4 ? (
              <>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    UK eTA Application
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Electronic Travel Authorization
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Travel document required to enter the United Kingdom
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Valid for up to 2 years and electronically linked to the holder&apos;s passport
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Permits multiple short visits to the UK — up to 6 months per entry
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Each traveller requires a separate authorization
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Your application is checked before submission. Approval is sent to the email address you provide.
                  </p>
                </div>
              </>
            ) : null}
          </div>
          )}

          {/* Right side for step 5 — two stacked divs */}
          {currentStep === 5 && (
            <div className="w-full md:w-auto" style={{ flex: 1, maxWidth: "442px", alignSelf: "flex-start", display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Fees div */}
              <div style={{ borderRadius: "24px", border: "1px solid var(--form-border)", background: "var(--card)", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Header with bg #EFF4F9 */}
                <div style={{ background: "var(--accent-bg)", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid var(--form-border)" }}>
                  <div className="flex items-center justify-between">
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--primary)" }}>
                      UK eTA Fees
                    </h3>
                    <span style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Summary info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <User style={{ width: "24px", height: "24px", color: "var(--primary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Clock style={{ width: "24px", height: "24px", color: "var(--primary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      {selectedPackage.label}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <DollarSign style={{ width: "24px", height: "24px", color: "var(--primary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      ${selectedPackage.total.toFixed(2)} each
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid var(--form-border)" }} />

                {/* Fee breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>UK eTA Fees:</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "4px" }}>
                        ${selectedPackage.fee.toFixed(2)} × {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                      </p>
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                      ${feeTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Processing upgrade</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "4px" }}>
                        ${selectedPackage.processing.toFixed(2)} × {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                      </p>
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                      ${processingTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid var(--form-border)" }} />

                {/* Applicants in submission */}
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)", marginBottom: "16px" }}>
                    Applicant in submission
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {applicants.map((applicant, index) => (
                      <div key={applicant.id} className="flex items-center justify-between">
                        <div className="flex items-center" style={{ gap: "12px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "var(--hero-text)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                            {index + 1}
                          </div>
                          <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-body)" }}>
                            {getApplicantName(applicant.id)}
                          </span>
                        </div>
                        <Trash2 style={{ width: "20px", height: "20px", color: "var(--icon-muted)", cursor: "pointer" }} onClick={() => setDeleteModalApplicant(applicant.id)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's included div */}
              <div style={{ borderRadius: "24px", border: "1px solid var(--form-border)", background: "var(--card)", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ borderBottom: "1px solid var(--form-border)", paddingBottom: "16px" }}>
                  <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>What&apos;s included in your application</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="flex items-start" style={{ gap: "12px" }}>
                    <Image src={btick} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Encrypted personal data</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "4px" }}>
                        Information transmitted using Secure Sockets Layer (SSL) and stored in line with applicable data-protection standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start" style={{ gap: "12px" }}>
                    <Image src={btick} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>Multilingual support</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "4px" }}>
                        Email support available in eleven languages, seven days a week. Replies within 90 minutes during business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* UK eTA Application summary div */}
              <div style={{ borderRadius: "24px", border: "1px solid var(--form-border)", background: "var(--card)", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    UK eTA Application
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Electronic Travel Authorization
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Travel document required to enter the United Kingdom
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Valid for up to 2 years and electronically linked to the holder&apos;s passport
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Permits multiple short visits to the UK — up to 6 months per entry
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                      Each traveller requires a separate authorization
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--text-heading)" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "var(--text-body)", marginTop: "8px" }}>
                    Your application is checked before submission. Approval is sent to the email address you provide.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {deleteModalApplicant !== null && (
        <DeleteModal
          applicantName={getApplicantName(deleteModalApplicant!)}
          onKeep={() => setDeleteModalApplicant(null)}
          onRemove={() => {
            deleteApplicant(deleteModalApplicant!);
            setDeleteModalApplicant(null);
          }}
        />
      )}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </main>
  );
}

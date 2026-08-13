"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronDown, ChevronUp, Trash2, Globe, Check, ArrowRight, ArrowLeft, Plus, Upload, Clock, DollarSign, User } from "lucide-react";
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

const steps = ["Applicant", "Passport", "Passport image", "Your photo", "Review", "Payment"];

const labelStyle = {
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "140%",
  letterSpacing: "-0.02em",
  color: "#0F0F0F",
};

const helperStyle = {
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "165%",
  letterSpacing: "0em",
  color: "#575757",
};

const fieldStyle = {
  height: "56px",
  borderRadius: "999px",
  border: "1px solid #D9D9D9",
  padding: "16px",
  background: "white",
  fontSize: "16px",
  fontWeight: 400,
  color: "#0F0F0F",
  width: "100%",
  outline: "none",
};

function CountryDropdown({ placeholder, value: externalValue, onChange }: { placeholder: string; value?: Country | null; onChange?: (v: Country | null) => void }) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Country | null>(null);
  const value = externalValue !== undefined ? externalValue : internalValue;
  const setValue = (v: Country | null) => {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2.5 cursor-pointer"
        style={{ height: "56px", borderRadius: "999px", border: "1px solid #D9D9D9", padding: "16px", background: "white" }}
      >
        <Globe style={{ color: "#A9A9A9", width: "20px", height: "20px", flexShrink: 0 }} />
        <span className="flex-1 text-left" style={{ color: value ? "#0F0F0F" : "#A9A9A9", fontSize: "16px", fontWeight: 400 }}>
          {value ? `${value.flag} ${value.name}` : placeholder}
        </span>
        <ChevronDown style={{ color: "#A9A9A9", width: "20px", height: "20px", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-lg [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => { setValue(country); setOpen(false); }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-base hover:bg-gray-100"
              style={{ color: "#0F0F0F" }}
            >
              <span className="text-xl">{country.flag}</span>
              <span className="flex-1">{country.name}</span>
              {value?.code === country.code && <Check className="h-4 w-4" style={{ color: "var(--primary)" }} />}
            </button>
          ))}
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
        className="flex w-full items-center justify-between cursor-pointer"
        style={{ height: "56px", borderRadius: "999px", border: "1px solid #D9D9D9", padding: "16px", background: "white" }}
      >
        <span className="flex-1 text-left" style={{ color: value ? "#0F0F0F" : "#A9A9A9", fontSize: "16px", fontWeight: 400 }}>
          {value || placeholder}
        </span>
        <ChevronDown style={{ color: "#A9A9A9", width: "20px", height: "20px", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => { setValue(option); setOpen(false); onChange?.(option); }}
              className="flex w-full items-center px-4 py-3 text-left text-base hover:bg-gray-100"
              style={{ color: "#0F0F0F" }}
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
          className="flex w-full items-center justify-between cursor-pointer"
          style={{ height: "56px", borderRadius: "999px", border: "1px solid #D9D9D9", padding: "16px", background: "white" }}
        >
          <span className="flex-1 text-center" style={{ color: value ? "#0F0F0F" : "#A9A9A9", fontSize: "16px", fontWeight: 400 }}>
            {value || placeholder}
          </span>
          <ChevronDown style={{ color: "#A9A9A9", width: "20px", height: "20px", flexShrink: 0 }} />
        </button>
        {open && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => { setValue(option); setOpen(false); }}
                className="flex w-full items-center justify-center px-4 py-3 text-base hover:bg-gray-100"
                style={{ color: "#0F0F0F" }}
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
            border: value === "no" ? "8px solid var(--primary)" : "1px solid #D9D9D9",
            background: "white",
            flexShrink: 0,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        />
        <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
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
            border: value === "yes" ? "8px solid var(--primary)" : "1px solid #D9D9D9",
            background: "white",
            flexShrink: 0,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        />
        <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
          Yes
        </span>
      </label>
    </div>
  );
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
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
  const [applicantDOB, setApplicantDOB] = useState<Record<number, { day: string | null; month: string | null; year: string | null }>>({});
  const [applicantGender, setApplicantGender] = useState<Record<number, string>>({});
  const [applicantCountryOfBirth, setApplicantCountryOfBirth] = useState<Record<number, Country | null>>({});

  // Review consent
  const [reviewConsent, setReviewConsent] = useState<{ confirmInfo: boolean; privacyNotice: boolean }>({ confirmInfo: false, privacyNotice: false });

  // Processing speed selection
  const [selectedProcessing, setSelectedProcessing] = useState<"standard" | "express" | "fastest">("standard");

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
  const years = Array.from({ length: 100 }, (_, i) => String(2025 - i));

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
  };

  const saveImageApplicant = (id: number) => {
    setImageApplicants(imageApplicants.map((a) => (a.id === id ? { ...a, saved: true, expanded: false } : a)));
  };

  const toggleImageConsent = (id: number) => {
    setImageConsent((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allImageConsented = imageApplicants.length > 0 && imageApplicants.every((a) => imageConsent[a.id]);
  const allImageSaved = imageApplicants.length <= 1 || imageApplicants.every((a) => a.saved);

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
  };

  const savePhotoApplicant = (id: number) => {
    setPhotoApplicants(photoApplicants.map((a) => (a.id === id ? { ...a, saved: true, expanded: false } : a)));
  };

  const togglePhotoConsent = (id: number) => {
    setPhotoConsent((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allPhotoConsented = photoApplicants.length > 0 && photoApplicants.every((a) => photoConsent[a.id]);
  const allPhotoSaved = photoApplicants.length <= 1 || photoApplicants.every((a) => a.saved);

  const goToReviewStep = () => {
    setCurrentStep(4);
  };

  const allReviewConsented = reviewConsent.confirmInfo && reviewConsent.privacyNotice;

  // Processing pricing logic
  const processingPackages = {
    standard: { total: 89.90, fee: 59.00, processing: 30.90, label: "2-5 Days processing" },
    express: { total: 119.90, fee: 89.00, processing: 30.90, label: "6-24h processing" },
    fastest: { total: 139.90, fee: 109.00, processing: 30.90, label: "1h processing" },
  };
  const selectedPackage = processingPackages[selectedProcessing];
  const applicantCount = applicants.length;
  const feeTotal = selectedPackage.fee * applicantCount;
  const processingTotal = selectedPackage.processing * applicantCount;
  const grandTotal = feeTotal + processingTotal;

  return (
    <main>
      {/* Hero image section */}
      <div className="mx-auto px-4" style={{ maxWidth: "1408px" }}>
        <div className="relative w-full md:!h-[400px]" style={{ height: "245px" }}>
          <Image src={about} alt="Apply for eTA" fill className="object-cover" style={{ borderRadius: "16px" }} priority />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <button className="flex items-center justify-center rounded-full" style={{ width: "127px", height: "40px", gap: "16px", background: "transparent", border: "1px solid #FFFFFF", color: "#FFFFFF" }}>
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
        <h2 className="text-center md:!text-[48px] md:!leading-[120%] md:!tracking-[-0.03em]" style={{ fontSize: "32px", fontWeight: 500, lineHeight: "120%", letterSpacing: "-0.03em", color: "#0F0F0F", textAlign: "center" }}>
          {currentStep === 0 ? "Applicant Information" : currentStep === 1 ? "Passport Details" : currentStep === 2 ? "Passport Image" : currentStep === 3 ? "Your Photo" : currentStep === 4 ? "Review" : "Processing speed"}
        </h2>

        {/* Two divs with 32px gap */}
        <div className="flex flex-col lg:flex-row" style={{ gap: "32px", marginTop: "32px" }}>
          {/* Left div */}
          <div style={{ maxWidth: "898px", width: "100%", alignSelf: "flex-start", borderRadius: "24px", border: "1px solid #D9D9D9" }}>
            {/* Top section - bg #FAFAF9 */}
            <div style={{ background: "#FAFAF9", padding: "24px", borderBottom: "1px solid #D9D9D9", borderTopLeftRadius: "24px", borderTopRightRadius: "24px" }}>
              <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "12px" }}>
                Application · Step {currentStep + 1} of 6
              </p>
              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center" style={{ gap: "4px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 600, lineHeight: "150%", letterSpacing: "-0.01em", color: index === currentStep ? "var(--primary)" : "#A9A9A9" }}>
                      {step}
                    </span>
                    {index < steps.length - 1 && (
                      <ChevronRight style={{ width: "24px", height: "24px", color: index < currentStep ? "var(--primary)" : "#A9A9A9" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* White section */}
            <div style={{ background: "white", padding: "24px" }}>
              {currentStep === 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Applicants</h3>
                    <div style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
                      Number of travellers: <span style={{ fontWeight: 600, color: "#0F0F0F" }}>{applicants.length}</span>
                    </div>
                  </div>

                  {/* Applicant form cards */}
                  {applicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid #D9D9D9" }}>
                      {/* Blue header - bg #EFF6FF */}
                      <div style={{ background: "#EFF6FF", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid #D9D9D9" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "#575757" }}>Applicant {index + 1}</span>
                                <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Your information</span>
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "#575757" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            <Trash2 style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => deleteApplicant(applicant.id)} />
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => toggleExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => toggleExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section - bg #FAFAF9 */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "#FAFAF9", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
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
                              <input type="email" placeholder="john@gmail.com" style={{ ...fieldStyle }} value={applicantEmails[applicant.id] || ""} onChange={(e) => updateApplicantEmail(applicant.id, e.target.value)} />
                            </div>
                            <p style={{ ...helperStyle, marginTop: "8px" }}>Used to send your approval confirmation and any updates about your application.</p>
                          </div>

                          {/* First name & Last name */}
                          <div style={{ marginTop: "24px", gap: "16px" }} className="flex flex-col md:flex-row">
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>First name(s) <span style={{ color: "#EF4444" }}>*</span></label>
                              <div style={{ marginTop: "8px" }}>
                                <input type="text" placeholder="As shown on your passport" style={{ ...fieldStyle }} value={applicantNames[applicant.id]?.firstName || ""} onChange={(e) => updateApplicantName(applicant.id, "firstName", e.target.value)} />
                              </div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Last name (surname) <span style={{ color: "#EF4444" }}>*</span></label>
                              <div style={{ marginTop: "8px" }}>
                                <input type="text" placeholder="As shown on your passport" style={{ ...fieldStyle }} value={applicantNames[applicant.id]?.lastName || ""} onChange={(e) => updateApplicantName(applicant.id, "lastName", e.target.value)} />
                              </div>
                            </div>
                          </div>

                          {/* Date of birth & Gender */}
                          <div style={{ marginTop: "24px", gap: "16px" }} className="flex flex-col md:flex-row">
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Date of birth <span style={{ color: "#EF4444" }}>*</span></label>
                              <div className="flex" style={{ gap: "8px", marginTop: "8px" }}>
                                <DateDropdown placeholder="DD" options={days} label="Day" value={applicantDOB[applicant.id]?.day ?? null} onChange={(v) => updateApplicantDOB(applicant.id, "day", v)} />
                                <DateDropdown placeholder="MM" options={months} label="Month" value={applicantDOB[applicant.id]?.month ?? null} onChange={(v) => updateApplicantDOB(applicant.id, "month", v)} />
                                <DateDropdown placeholder="YYYY" options={years} label="Year" value={applicantDOB[applicant.id]?.year ?? null} onChange={(v) => updateApplicantDOB(applicant.id, "year", v)} />
                              </div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Gender<span style={{ color: "#EF4444" }}>*</span></label>
                              <div style={{ marginTop: "8px" }}>
                                <GenericDropdown placeholder="Select" options={["Male", "Female", "Other", "Prefer not to say"]} value={applicantGender[applicant.id] ?? null} onChange={(v) => updateApplicantGender(applicant.id, v)} />
                              </div>
                            </div>
                          </div>

                          {/* Country of birth */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Country of birth <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <CountryDropdown placeholder="Select country" value={applicantCountryOfBirth[applicant.id] ?? null} onChange={(v) => updateApplicantCountryOfBirth(applicant.id, v)} />
                            </div>
                          </div>

                          {/* Save button */}
                          {multipleApplicants && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                onClick={() => saveApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: "var(--primary)",
                                  color: "#FFFFFF",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
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
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Applicant passport details</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                      Enter the details of the passport you will use to travel. The information must match the passport exactly.
                    </p>
                  </div>

                  {/* Passport form cards */}
                  {passportApplicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid #D9D9D9" }}>
                      {/* Blue header - bg #EFF6FF */}
                      <div style={{ background: "#EFF6FF", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid #D9D9D9" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "#575757" }}>Applicant {index + 1}</span>
                                <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Passport details</span>
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "#575757" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            <Trash2 style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => deletePassportApplicant(applicant.id)} />
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section - bg #FAFAF9 */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "#FAFAF9", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          {/* Nationality on passport */}
                          <div>
                            <label style={{ ...labelStyle }}>Nationality on passport <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <CountryDropdown placeholder="Select passport nationality" value={passportData[applicant.id]?.nationality ?? null} onChange={(v) => updatePassportData(applicant.id, "nationality", v)} />
                            </div>
                          </div>

                          {/* Passport number */}
                          <div style={{ marginTop: "24px" }}>
                            <label style={{ ...labelStyle }}>Passport number <span style={{ color: "#EF4444" }}>*</span></label>
                            <div style={{ marginTop: "8px" }}>
                              <input type="text" placeholder="xxxxxxxxx" style={{ ...fieldStyle }} value={passportData[applicant.id]?.passportNumber || ""} onChange={(e) => updatePassportData(applicant.id, "passportNumber", e.target.value)} />
                            </div>
                            <p style={{ ...helperStyle, marginTop: "8px" }}>Typically 8–11 characters. Use letters and numbers exactly as printed.</p>
                          </div>

                          {/* Date of issue & Date of expiry */}
                          <div style={{ marginTop: "24px", gap: "16px" }} className="flex flex-col md:flex-row">
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Date of issue <span style={{ color: "#EF4444" }}>*</span></label>
                              <div className="flex" style={{ gap: "8px", marginTop: "8px" }}>
                                <DateDropdown placeholder="DD" options={days} label="Day" value={passportData[applicant.id]?.dateIssue?.day ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateIssue", "day", v)} />
                                <DateDropdown placeholder="MM" options={months} label="Month" value={passportData[applicant.id]?.dateIssue?.month ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateIssue", "month", v)} />
                                <DateDropdown placeholder="YYYY" options={years} label="Year" value={passportData[applicant.id]?.dateIssue?.year ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateIssue", "year", v)} />
                              </div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ ...labelStyle }}>Date of expiry <span style={{ color: "#EF4444" }}>*</span></label>
                              <div className="flex" style={{ gap: "8px", marginTop: "8px" }}>
                                <DateDropdown placeholder="DD" options={days} label="Day" value={passportData[applicant.id]?.dateExpiry?.day ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateExpiry", "day", v)} />
                                <DateDropdown placeholder="MM" options={months} label="Month" value={passportData[applicant.id]?.dateExpiry?.month ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateExpiry", "month", v)} />
                                <DateDropdown placeholder="YYYY" options={years} label="Year" value={passportData[applicant.id]?.dateExpiry?.year ?? null} onChange={(v) => updatePassportDateField(applicant.id, "dateExpiry", "year", v)} />
                              </div>
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
                                onClick={() => savePassportApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: "var(--primary)",
                                  color: "#FFFFFF",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
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
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Photo of your passport</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                      You must provide a photo of your physical passport. Your application may be rejected if you upload or take a photo of a digital passport.
                    </p>
                  </div>

                  {imageApplicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid #D9D9D9" }}>
                      {/* Blue header */}
                      <div style={{ background: "#EFF6FF", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid #D9D9D9" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "#575757" }}>Applicant {index + 1}</span>
                                {applicantNames[applicant.id]?.firstName || applicantNames[applicant.id]?.lastName ? (
                                  <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>{getApplicantName(applicant.id)}</span>
                                ) : null}
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "#575757" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            <Trash2 style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => deleteImageApplicant(applicant.id)} />
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => toggleImageExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => toggleImageExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "#FAFAF9", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          {/* The passport photo must clearly show: */}
                          <div className="flex flex-col sm:flex-row" style={{ gap: "16px", alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                                The passport photo must clearly show:
                              </p>
                              <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                                <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>All four corners of the passport&apos;s personal details page</li>
                                <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Your personal details</li>
                                <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>The Machine Readable Zone (MRZ) at the bottom of the personal details page (2–3 lines of letters, numbers, and symbols)</li>
                              </ul>
                            </div>
                            <div style={{ flexShrink: 0 }}>
                              <Image src={pasport1} alt="Passport example" width={220} height={128} style={{ maxWidth: "219.6px", height: "128px", borderRadius: "8px" }} />
                            </div>
                          </div>

                          {/* The photo must be: */}
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", marginTop: "24px" }}>
                            The photo must be:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Clear and in focus</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Free from glare and reflections</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Unedited (no filters or effects)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Original image (not a screenshot or photocopy)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>In colour</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Landscape orientation</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Minimum resolution: 600 × 750 px</li>
                          </ul>

                          {/* Upload area */}
                          <div className="upload-area-desktop" style={{ marginTop: "24px", maxWidth: "802px", width: "100%", height: "192px", border: "1px dashed #D9D9D9", borderRadius: "16px", padding: "24px", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                            <Image src={uploadIcon} alt="Upload" width={42} height={42} style={{ width: "42px", height: "42px" }} />
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", textAlign: "center" }}>
                              Drag your file(s) to start uploading
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                              <div style={{ width: "79px", height: "1px", background: "#D9D9D9" }} />
                              <span style={{ fontSize: "12px", fontWeight: 400, lineHeight: "165%", color: "#B7B7B7", textAlign: "center" }}>OR</span>
                              <div style={{ width: "79px", height: "1px", background: "#D9D9D9" }} />
                            </div>
                            <button
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
                                color: "#FFFFFF",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              <Upload style={{ width: "16px", height: "16px" }} />
                              Upload Images
                            </button>
                          </div>
                          {/* Mobile upload button */}
                          <button
                            className="upload-area-mobile flex items-center justify-center w-full"
                            style={{
                              marginTop: "24px",
                              height: "48px",
                              gap: "8px",
                              borderRadius: "999px",
                              background: "var(--primary)",
                              color: "#FFFFFF",
                              fontSize: "16px",
                              fontWeight: 500,
                              cursor: "pointer",
                              display: "none",
                            }}
                          >
                            <Upload style={{ width: "20px", height: "20px" }} />
                            Upload Image
                          </button>

                          {/* File format note */}
                          <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#575757", marginTop: "16px" }}>
                            File format (optional): we recommend using a JPG or JPEG file format.
                          </p>

                          {/* Consent checkbox */}
                          <div className="flex items-start" style={{ gap: "12px", marginTop: "16px" }}>
                            <div
                              onClick={() => toggleImageConsent(applicant.id)}
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "6px",
                                border: imageConsent[applicant.id] ? "2px solid var(--primary)" : "1px solid #D9D9D9",
                                background: imageConsent[applicant.id] ? "var(--primary)" : "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                cursor: "pointer",
                                marginTop: "2px",
                              }}
                            >
                              {imageConsent[applicant.id] && <Check style={{ width: "16px", height: "16px", color: "white" }} />}
                            </div>
                            <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#575757" }}>
                              I consent to the secure collection and processing of my biometric data (passport photo and selfie) solely for my UKVI application. My data will be permanently deleted from our system within 10 days.
                            </p>
                          </div>

                          {/* Save button */}
                          {imageApplicants.length > 1 && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                onClick={() => saveImageApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: "var(--primary)",
                                  color: "#FFFFFF",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
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
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Photo of yourself</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                      You must provide a live photo of yourself. Do not upload a screenshot, scanned image, or another person&apos;s photo.
                    </p>
                  </div>

                  {photoApplicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid #D9D9D9" }}>
                      {/* Blue header */}
                      <div style={{ background: "#EFF6FF", padding: "16px 24px", borderBottom: applicant.expanded ? "1px solid #D9D9D9" : "none", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: applicant.expanded ? "0" : "16px", borderBottomRightRadius: applicant.expanded ? "0" : "16px" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center" style={{ gap: "12px" }}>
                            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center flex-wrap" style={{ gap: "4px" }}>
                                <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "#575757" }}>Applicant {index + 1}</span>
                                {applicantNames[applicant.id]?.firstName || applicantNames[applicant.id]?.lastName ? (
                                  <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>{getApplicantName(applicant.id)}</span>
                                ) : null}
                              </div>
                              <span style={{ fontSize: "14px", fontWeight: 500, color: applicant.saved ? "#575757" : "var(--primary)", marginTop: "4px" }}>{applicant.saved ? "Saved" : "In Progress"}</span>
                            </div>
                          </div>
                          <div className="flex items-center" style={{ gap: "24px" }}>
                            <Trash2 style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => deletePhotoApplicant(applicant.id)} />
                            {applicant.expanded ? (
                              <ChevronUp style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => togglePhotoExpand(applicant.id)} />
                            ) : (
                              <ChevronDown style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => togglePhotoExpand(applicant.id)} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form section */}
                      {applicant.expanded && (
                        <div className="apply-form" style={{ background: "#FAFAF9", padding: "24px", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                            Make sure you have:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Plain, light-colored background (e.g., a white wall)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>No people or objects in the background</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Head, shoulders, and upper body fully visible</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Position yourself at a comfortable distance from the camera</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Even lighting with no shadows or glare on your face or background</li>
                          </ul>

                          {/* You must not: */}
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", marginTop: "24px" }}>
                            You must not:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Do not cover your face or eyes</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Head coverings are only permitted for religious or medical reasons</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Do not wear fashion hair accessories that cover your face</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Avoid excessive makeup</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Do not wear glasses; your eyes must be fully visible and open</li>
                          </ul>

                          {/* The photo must be: */}
                          <p style={{ fontSize: "16px", fontWeight: 500, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", marginTop: "24px" }}>
                            The photo must be:
                          </p>
                          <ul style={{ marginTop: "8px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "disc" }}>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Different from your passport photo</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Recently taken (take the photo now)</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Portrait orientation</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>In colour</li>
                            <li style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Minimum resolution: 600 × 750 px</li>
                          </ul>

                          {/* Upload area */}
                          <div className="upload-area-desktop" style={{ marginTop: "24px", maxWidth: "802px", width: "100%", height: "192px", border: "1px dashed #D9D9D9", borderRadius: "16px", padding: "24px", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                            <Image src={uploadIcon} alt="Upload" width={42} height={42} style={{ width: "42px", height: "42px" }} />
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", textAlign: "center" }}>
                              Drag your file(s) to start uploading
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                              <div style={{ width: "79px", height: "1px", background: "#D9D9D9" }} />
                              <span style={{ fontSize: "12px", fontWeight: 400, lineHeight: "165%", color: "#B7B7B7", textAlign: "center" }}>OR</span>
                              <div style={{ width: "79px", height: "1px", background: "#D9D9D9" }} />
                            </div>
                            <button
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
                                color: "#FFFFFF",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "pointer",
                              }}
                            >
                              <Upload style={{ width: "16px", height: "16px" }} />
                              Upload Images
                            </button>
                          </div>
                          {/* Mobile upload button */}
                          <button
                            className="upload-area-mobile flex items-center justify-center w-full"
                            style={{
                              marginTop: "24px",
                              height: "48px",
                              gap: "8px",
                              borderRadius: "999px",
                              background: "var(--primary)",
                              color: "#FFFFFF",
                              fontSize: "16px",
                              fontWeight: 500,
                              cursor: "pointer",
                              display: "none",
                            }}
                          >
                            <Upload style={{ width: "20px", height: "20px" }} />
                            Upload Image
                          </button>

                          {/* File format note */}
                          <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#575757", marginTop: "16px" }}>
                            File format (optional): we recommend using a JPG or JPEG file format.
                          </p>

                          {/* Save button */}
                          {photoApplicants.length > 1 && (
                            <div className="flex justify-end" style={{ marginTop: "24px" }}>
                              <button
                                onClick={() => savePhotoApplicant(applicant.id)}
                                className="flex items-center justify-center w-full md:w-auto"
                                style={{
                                  height: "48px",
                                  gap: "8px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",
                                  borderRadius: "999px",
                                  background: "var(--primary)",
                                  color: "#FFFFFF",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
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
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Applicants</h3>
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
                      Number of travellers: {applicants.length}
                    </span>
                  </div>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                    Please review the details below carefully. Once you pay, the information will be submitted for processing.
                  </p>

                  {applicants.map((applicant, index) => (
                    <div key={applicant.id} style={{ marginTop: "16px", borderRadius: "16px", border: "1px solid #D9D9D9" }}>
                      {/* Header */}
                      <div style={{ background: "#EFF6FF", padding: "16px 24px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                        <div className="flex items-center" style={{ gap: "12px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                            {index + 1}
                          </div>
                          <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                            {getApplicantName(applicant.id)}
                          </span>
                        </div>
                      </div>

                      {/* Personal Information section */}
                      <div style={{ padding: "24px" }}>
                        <div style={{ borderBottom: "1px solid #D9D9D9", paddingBottom: "16px", marginBottom: "16px" }}>
                          <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Personal Information</p>
                        </div>

                        {/* Email / First name / Last name */}
                        <div className="flex flex-col md:flex-row" style={{ gap: "24px" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Email:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{applicantEmails[applicant.id] || "-"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>First name:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{applicantNames[applicant.id]?.firstName || "-"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Last name:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{applicantNames[applicant.id]?.lastName || "-"}</p>
                          </div>
                        </div>

                        {/* DOB / Gender / Country of birth */}
                        <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "16px" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Date of birth:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{formatDate(applicantDOB[applicant.id])}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Gender:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{applicantGender[applicant.id] || "-"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Country of birth:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{applicantCountryOfBirth[applicant.id]?.name || "-"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ borderTop: "1px solid #D9D9D9", margin: "0 24px" }} />

                      {/* Passport & Personal Photo */}
                      <div style={{ padding: "24px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "16px" }}>Passport &amp; Personal Photo</p>
                        <div className="flex" style={{ gap: "24px" }}>
                          <div style={{ width: "139px", height: "100px", borderRadius: "8px", border: "1px dashed #D9D9D9", background: "#FAFAF9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Upload style={{ width: "24px", height: "24px", color: "#A9A9A9" }} />
                          </div>
                          <div style={{ width: "100px", height: "100px", borderRadius: "8px", border: "1px dashed #D9D9D9", background: "#FAFAF9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Upload style={{ width: "24px", height: "24px", color: "#A9A9A9" }} />
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div style={{ borderTop: "1px solid #D9D9D9", margin: "0 24px" }} />

                      {/* Passport Information */}
                      <div style={{ padding: "24px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "16px" }}>Personal Information</p>

                        {/* Nationality / Document number / Issued */}
                        <div className="flex flex-col md:flex-row" style={{ gap: "24px" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Nationality:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{passportData[applicant.id]?.nationality?.name || "-"}</p>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "16px" }}>Expires:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{formatDate(passportData[applicant.id]?.dateExpiry)}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Document number:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{passportData[applicant.id]?.passportNumber || "-"}</p>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "16px" }}>Dual citizenship:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{passportApplicants.find((a) => a.id === applicant.id)?.otherCitizen === "yes" ? "Yes" : "No"}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>Issued:</p>
                            <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>{formatDate(passportData[applicant.id]?.dateIssue)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Consent & declaration */}
                  <div style={{ marginTop: "32px" }}>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Consent &amp; declaration</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
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
                        border: reviewConsent.confirmInfo ? "2px solid var(--primary)" : "1px solid #D9D9D9",
                        background: reviewConsent.confirmInfo ? "var(--primary)" : "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        marginTop: "2px",
                      }}
                    >
                      {reviewConsent.confirmInfo && <Check style={{ width: "16px", height: "16px", color: "white" }} />}
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
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
                        border: reviewConsent.privacyNotice ? "2px solid var(--primary)" : "1px solid #D9D9D9",
                        background: reviewConsent.privacyNotice ? "var(--primary)" : "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "pointer",
                        marginTop: "2px",
                      }}
                    >
                      {reviewConsent.privacyNotice && <Check style={{ width: "16px", height: "16px", color: "white" }} />}
                    </div>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      I consent to the processing of my personal data as described in the Privacy Notice, and I confirm that I have read and accept the Terms &amp; Conditions. I acknowledge that Service eVisa is a private, independent provider and is not affiliated with the United Kingdom government, that a service fee is charged in addition to the government fee, and that I may apply directly through the official United Kingdom government website. *
                    </p>
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Processing speed</h3>
                    <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                      Choose your processing speed and pay securely to submit your application.
                    </p>
                  </div>

                  {/* Option 1: 2-5 Days processing */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid #D9D9D9", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "white" }}
                    onClick={() => setSelectedProcessing("standard")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "standard" ? "2px solid var(--primary)" : "2px solid #D9D9D9", background: selectedProcessing === "standard" ? "var(--primary)" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "standard" && <Check style={{ width: "16px", height: "16px", color: "white" }} />}
                    </div>
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>2-5 Days processing</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", marginTop: "4px" }}>$89.90</p>
                    </div>
                  </div>

                  {/* Option 2: 6-24h processing */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid #D9D9D9", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "white" }}
                    onClick={() => setSelectedProcessing("express")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "express" ? "2px solid var(--primary)" : "2px solid #D9D9D9", background: selectedProcessing === "express" ? "var(--primary)" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "express" && <Check style={{ width: "16px", height: "16px", color: "white" }} />}
                    </div>
                    <div>
                      <div className="flex items-center" style={{ gap: "10px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>6-24h processing</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", height: "30px", borderRadius: "99px", paddingTop: "4px", paddingRight: "8px", paddingBottom: "4px", paddingLeft: "8px", background: "#EFFEFA", fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#28806F" }}>
                          Popular
                        </span>
                      </div>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", marginTop: "4px" }}>$119.90</p>
                    </div>
                  </div>

                  {/* Option 3: 1h processing */}
                  <div style={{ padding: "16px", borderRadius: "16px", border: "1px solid #D9D9D9", display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", background: "white" }}
                    onClick={() => setSelectedProcessing("fastest")}
                  >
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: selectedProcessing === "fastest" ? "2px solid var(--primary)" : "2px solid #D9D9D9", background: selectedProcessing === "fastest" ? "var(--primary)" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      {selectedProcessing === "fastest" && <Check style={{ width: "16px", height: "16px", color: "white" }} />}
                    </div>
                    <div>
                      <div className="flex items-center" style={{ gap: "10px" }}>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>1h processing</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", height: "30px", borderRadius: "99px", paddingTop: "4px", paddingRight: "8px", paddingBottom: "4px", paddingLeft: "8px", background: "#EFF4F9", fontSize: "14px", fontWeight: 400, lineHeight: "160%", letterSpacing: "0em", color: "#2D76B5" }}>
                          Fastest
                        </span>
                      </div>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F", marginTop: "4px" }}>$139.90</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {currentStep === 0 && (
              <div style={{ padding: "24px", background: "white" }}>
                <button
                  onClick={addApplicant}
                  className="flex items-center justify-center"
                  style={{
                    width: "100%",
                    height: "56px",
                    gap: "8px",
                    borderRadius: "99px",
                    border: "1px dashed #D9D9D9",
                    padding: "16px",
                    background: "#EFF4F9",
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
            <div className="flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-4" style={{ borderTop: "1px solid #D9D9D9", padding: "24px", background: "white", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}>
              {currentStep === 0 ? (
                <>
                  <p className="order-2 md:order-1" style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", textAlign: "center" }}>
                    Each traveller requires a separate authorization.
                  </p>
                  <button
                    disabled={!allApplicantsSaved}
                    onClick={goToPassportStep}
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
                      background: allApplicantsSaved ? "var(--primary)" : "#D9D9D9",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: allApplicantsSaved ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to passport details
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 1 ? (
                <>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "white",
                      border: "1px solid #D9D9D9",
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
                    disabled={!allPassportSaved}
                    onClick={goToImageStep}
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
                      background: allPassportSaved ? "var(--primary)" : "#D9D9D9",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: allPassportSaved ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to passport image
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 2 ? (
                <>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "white",
                      border: "1px solid #D9D9D9",
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
                    disabled={!allImageConsented}
                    onClick={goToPhotoStep}
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
                      background: allImageConsented ? "var(--primary)" : "#D9D9D9",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: allImageConsented ? "pointer" : "not-allowed",
                    }}
                  >
                    Continue to your image
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 3 ? (
                <>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "white",
                      border: "1px solid #D9D9D9",
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
                    className="flex items-center justify-center order-1 md:order-2 w-full md:w-auto md:max-w-[283px]"
                    onClick={goToReviewStep}
                    style={{
                      width: "100%",
                      height: "48px",
                      gap: "8px",
                      paddingTop: "12px",
                      paddingRight: "20px",
                      paddingBottom: "12px",
                      paddingLeft: "20px",
                      borderRadius: "999px",
                      background: "var(--primary)",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  >
                    Continue to review
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : currentStep === 4 ? (
                <>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "white",
                      border: "1px solid #D9D9D9",
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
                      background: allReviewConsented ? "var(--primary)" : "#D9D9D9",
                      color: "#FFFFFF",
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
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center justify-center order-2 md:order-1 w-full md:w-auto"
                    style={{
                      height: "48px",
                      gap: "8px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      borderRadius: "999px",
                      background: "white",
                      border: "1px solid #D9D9D9",
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
                      background: "var(--primary)",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 500,
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  >
                    Pay &amp; Submit application
                    <ArrowRight style={{ width: "20px", height: "20px" }} />
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {/* Right div */}
          {currentStep !== 5 && (
          <div className="w-full md:w-auto" style={{ flex: 1, maxWidth: "442px", alignSelf: "flex-start", borderRadius: "24px", border: "1px solid #D9D9D9", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            {currentStep === 0 ? (
              <>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    UK eTA Application
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                    Electronic Travel Authorization
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Travel document required to enter the United Kingdom
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Valid for up to 2 years and electronically linked to the holder&apos;s passport
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Permits multiple short visits to the UK — up to 6 months per entry
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Each traveller requires a separate authorization
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                    Your application is checked before submission. Approval is sent to the email address you provide.
                  </p>
                </div>
              </>
            ) : currentStep === 1 ? (
              <>
                <div style={{ background: "#FAFAF9", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid #D9D9D9" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    UK eTA · Summary
                  </h3>
                </div>

                {passportApplicants.map((applicant, index) => (
                  <div key={applicant.id}>
                    {index > 0 && (
                      <div style={{ borderTop: "1px solid #D9D9D9", margin: "0 -24px 24px -24px" }} />
                    )}

                    {/* Applicant header with number, name, and chevron */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center" style={{ gap: "12px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                          {index + 1}
                        </div>
                        <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                          {getApplicantName(applicant.id)}
                        </span>
                      </div>
                      {applicant.expanded ? (
                        <ChevronUp style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                      ) : (
                        <ChevronDown style={{ width: "24px", height: "24px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => togglePassportExpand(applicant.id)} />
                      )}
                    </div>

                    {/* Document no & Type row */}
                    <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
                          Document no:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                          {passportData[applicant.id]?.passportNumber || "-"}
                        </p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
                          Type:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                          {passportData[applicant.id]?.nationality ? "Passport" : "-"}
                        </p>
                      </div>
                    </div>

                    {/* Issued & Expires row */}
                    <div className="flex flex-col md:flex-row" style={{ gap: "24px", marginTop: "16px" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
                          Issued:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                          {formatDate(passportData[applicant.id]?.dateIssue)}
                        </p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757" }}>
                          Expires:
                        </p>
                        <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginTop: "4px" }}>
                          {formatDate(passportData[applicant.id]?.dateExpiry)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : currentStep === 2 ? (
              <>
                <div style={{ background: "#FAFAF9", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid #D9D9D9" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    Image Guide
                  </h3>
                </div>

                {/* Row 1: p1 + p2 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={p1} alt="Example 1" width={183} height={131} className="guide-img" style={{ borderRadius: "8px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                        The image is not acceptable: it is out of focus or blurred.
                      </p>
                    </div>
                  </div>
                  <div className="guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={p2} alt="Example 2" width={183} height={131} className="guide-img" style={{ borderRadius: "8px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
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
                    <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                      The image is not acceptable: it is visible and in frame.
                    </p>
                  </div>
                </div>
              </>
            ) : currentStep === 3 ? (
              <>
                <div style={{ background: "#FAFAF9", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid #D9D9D9" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    Image Guide
                  </h3>
                </div>

                {/* Row 1: r1 + r2 side by side, each with caption below */}
                <div className="flex" style={{ gap: "16px" }}>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r1} alt="Example 1" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                        Head-and-shoulders photo on a plain, light background
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r2} alt="Example 2" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pc} alt="Cross" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
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
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                        Head-and-shoulders photo with even lighting
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r4} alt="Example 4" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
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
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                        Photo of a person&apos;s wearing religious headwear
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r6} alt="Example 6" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
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
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                        Head-and-shoulders photo with eyes clearly visible
                      </p>
                    </div>
                  </div>
                  <div className="photo-guide-img-item" style={{ maxWidth: "183px", width: "100%" }}>
                    <Image src={r8} alt="Example 8" width={183} height={131} className="guide-img" style={{ borderRadius: "16px", flexShrink: 0 }} />
                    <div className="flex items-start" style={{ gap: "8px", marginTop: "8px" }}>
                      <Image src={pt} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                      <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: "160%", color: "#0F0F0F" }}>
                        Head-and-shoulders photo of a person wearing glasses that cover their eyes
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : currentStep === 4 ? (
              <>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    UK eTA Application
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                    Electronic Travel Authorization
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Travel document required to enter the United Kingdom
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Valid for up to 2 years and electronically linked to the holder&apos;s passport
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Permits multiple short visits to the UK — up to 6 months per entry
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Each traveller requires a separate authorization
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
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
              <div style={{ borderRadius: "24px", border: "1px solid #D9D9D9", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Header with bg #EFF4F9 */}
                <div style={{ background: "#EFF4F9", margin: "-24px -24px 0 -24px", padding: "24px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", borderBottom: "1px solid #D9D9D9" }}>
                  <div className="flex items-center justify-between">
                    <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "var(--primary)" }}>
                      UK eTA Fees
                    </h3>
                    <span style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Summary info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <User style={{ width: "24px", height: "24px", color: "var(--primary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Clock style={{ width: "24px", height: "24px", color: "var(--primary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      {selectedPackage.label}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <DollarSign style={{ width: "24px", height: "24px", color: "var(--primary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      ${selectedPackage.total.toFixed(2)} each
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #D9D9D9" }} />

                {/* Fee breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>UK eTA Fees:</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "4px" }}>
                        ${selectedPackage.fee.toFixed(2)} × {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                      </p>
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                      ${feeTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Processing upgrade</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "4px" }}>
                        ${selectedPackage.processing.toFixed(2)} × {applicantCount} {applicantCount === 1 ? "applicant" : "applicants"}
                      </p>
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                      ${processingTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #D9D9D9" }} />

                {/* Applicants in submission */}
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F", marginBottom: "16px" }}>
                    Applicant in submission
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {applicants.map((applicant, index) => (
                      <div key={applicant.id} className="flex items-center justify-between">
                        <div className="flex items-center" style={{ gap: "12px" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 }}>
                            {index + 1}
                          </div>
                          <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: "140%", letterSpacing: "-0.02em", color: "#575757" }}>
                            {getApplicantName(applicant.id)}
                          </span>
                        </div>
                        <Trash2 style={{ width: "20px", height: "20px", color: "#A9A9A9", cursor: "pointer" }} onClick={() => setDeleteModalApplicant(applicant.id)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's included div */}
              <div style={{ borderRadius: "24px", border: "1px solid #D9D9D9", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ borderBottom: "1px solid #D9D9D9", paddingBottom: "16px" }}>
                  <p style={{ fontSize: "18px", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>What&apos;s included in your application</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div className="flex items-start" style={{ gap: "12px" }}>
                    <Image src={btick} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Encrypted personal data</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "4px" }}>
                        Information transmitted using Secure Sockets Layer (SSL) and stored in line with applicable data-protection standards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start" style={{ gap: "12px" }}>
                    <Image src={btick} alt="Tick" width={24} height={24} style={{ width: "24px", height: "24px", flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>Multilingual support</p>
                      <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "4px" }}>
                        Email support available in eleven languages, seven days a week. Replies within 90 minutes during business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* UK eTA Application summary div */}
              <div style={{ borderRadius: "24px", border: "1px solid #D9D9D9", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <h3 style={{ fontSize: "24px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    UK eTA Application
                  </h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
                    Electronic Travel Authorization
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Travel document required to enter the United Kingdom
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Valid for up to 2 years and electronically linked to the holder&apos;s passport
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Permits multiple short visits to the UK — up to 6 months per entry
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <Image src={btick} alt="Tick" width={20} height={20} style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#0F0F0F" }}>
                      Each traveller requires a separate authorization
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.02em", color: "#0F0F0F" }}>
                    Note:
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", letterSpacing: "-0.01em", color: "#575757", marginTop: "8px" }}>
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
    </main>
  );
}

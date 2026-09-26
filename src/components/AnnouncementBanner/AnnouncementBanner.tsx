"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="w-full relative"
      style={{
        background: "#1E293B",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "150%",
        padding: "10px 40px",
      }}
    >
      <span className="block text-center">
        DISCLAIMER: Evisaeta is an independent private consultancy providing application assistance services. We are not affiliated with, endorsed by, or connected to the UK Government or Home Office. Official UK ETAs can be obtained directly from gov.uk without paying our agency service fee.
      </span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss disclaimer"
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          top: "50%",
          right: "12px",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "#FFFFFF",
          padding: "4px",
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}

export function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: number) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          style={{
            padding: "16px 20px",
            borderRadius: "12px",
            background:
              toast.type === "error"
                ? "#FEF2F2"
                : toast.type === "success"
                ? "#F0FDF4"
                : "#EFF6FF",
            border: `1px solid ${
              toast.type === "error"
                ? "#FECACA"
                : toast.type === "success"
                ? "#BBF7D0"
                : "#BFDBFE"
            }`,
            color:
              toast.type === "error"
                ? "#DC2626"
                : toast.type === "success"
                ? "#16A34A"
                : "#2563EB",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "150%",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "opacity 0.3s",
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

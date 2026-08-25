const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function request<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw {
      status: res.status,
      message: data?.error || data?.message || "Request failed",
    };
  }

  return data;
}

export interface ApplicantPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  countryOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  dualCitizenship: boolean;
  previouslyAppliedUk: boolean;
  passportImageUrl: string;
  personalPhotoUrl: string;
  imageConsent: boolean;
  photoConsent: boolean;
}

export interface PaymentPayload {
  applicantCount: number;
  processingType: string;
  feePerApplicant: number;
  processingFeePerApplicant: number;
  feeTotal: number;
  processingTotal: number;
  grandTotal: number;
}

export interface SubmitApplicationPayload {
  applicants: ApplicantPayload[];
  processingType: string;
  confirmInfo: boolean;
  privacyNotice: boolean;
  payment: PaymentPayload;
}

export const api = {
  async submitApplication(payload: SubmitApplicationPayload) {
    return request("/applications", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async createCheckoutSession(payload: {
    applicants: ApplicantPayload[];
    processingType: string;
    confirmInfo: boolean;
    privacyNotice: boolean;
  }): Promise<{ url: string }> {
    return request("/payments/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getPaymentStatus(sessionId: string): Promise<{
    status: "pending" | "paid" | "failed";
    applicantId?: string;
    referenceNumber?: string;
  }> {
    return request(`/payments/status/${encodeURIComponent(sessionId)}`);
  },

  async trackApplication(applicantId: string, email: string) {
    return request("/applications/track", {
      method: "POST",
      body: JSON.stringify({ applicantId, email }),
    });
  },

  async login(email: string, password: string) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async refreshToken(refreshToken: string) {
    return request("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  },

  async submitQuery(data: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    message: string;
  }) {
    return request("/queries", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

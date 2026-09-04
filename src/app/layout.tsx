import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://evisa-eta.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "UK ETA Application | Apply for UK Electronic Travel Authorisation Online",
    template: "%s | eVisa ETA",
  },
  description:
    "Apply for your UK ETA (Electronic Travel Authorisation) online. Fast, secure, and simple UK ETA application process with expert review and real-time status tracking.",
  keywords: [
    "UK ETA",
    "Electronic Travel Authorisation",
    "UK visa application",
    "apply UK ETA online",
    "UK travel authorisation",
    "eVisa ETA",
    "visa application online",
    "UK ETA application",
  ],
  authors: [{ name: "eVisa ETA" }],
  creator: "eVisa ETA",
  publisher: "eVisa ETA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "eVisa ETA",
    title: "UK ETA Application | Apply for UK Electronic Travel Authorisation Online",
    description:
      "Apply for your UK ETA (Electronic Travel Authorisation) online. Fast, secure, and simple UK ETA application process with expert review and real-time status tracking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK ETA Application | Apply for UK Electronic Travel Authorisation",
    description:
      "Fast, secure, and simple UK ETA application process with expert review and real-time status tracking.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "eVisa ETA",
  url: SITE_URL,
  description: "Online UK ETA (Electronic Travel Authorisation) application service with expert review and real-time status tracking.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: `${SITE_URL}/contact`,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "eVisa ETA",
  url: SITE_URL,
  description: "Apply for your UK ETA (Electronic Travel Authorisation) online.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/track-status?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

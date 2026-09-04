import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Privacy Policy - UK ETA Application Service";
const description = "Read the eVisa ETA privacy policy to understand how we handle your personal data during your UK Electronic Travel Authorisation application.";
const url = "https://evisa-eta.co.uk/privacy-policy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Privacy Policy", url },
        ]}
      />
      {children}
    </>
  );
}

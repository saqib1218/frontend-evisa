import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Refund Policy - UK ETA Application Service";
const description = "Read the eVisa ETA refund policy to understand our refund terms and conditions for UK Electronic Travel Authorisation applications.";
const url = "https://evisa-eta.co.uk/refund-policy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RefundPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Refund Policy", url },
        ]}
      />
      {children}
    </>
  );
}

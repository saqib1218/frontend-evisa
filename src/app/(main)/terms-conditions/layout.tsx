import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Terms & Conditions - UK ETA Application Service";
const description = "Read the eVisa ETA terms and conditions for using our UK Electronic Travel Authorisation application services.";
const url = "https://evisa-eta.co.uk/terms-conditions";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function TermsConditionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Terms & Conditions", url },
        ]}
      />
      {children}
    </>
  );
}

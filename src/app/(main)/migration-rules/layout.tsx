import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "UK ETA Migration Rules & Requirements";
const description =
  "Read about UK Electronic Travel Authorisation migration rules and requirements to understand if you need an ETA for your travel.";
const url = "https://evisa-eta.co.uk/migration-rules";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function MigrationRulesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Migration Rules & Disclaimer", url },
        ]}
      />
      {children}
    </>
  );
}

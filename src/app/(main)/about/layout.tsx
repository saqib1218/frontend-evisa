import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "About Us - UK ETA Application Experts";
const description =
  "Learn about eVisa ETA, your trusted UK Electronic Travel Authorisation application service. Expert review, real human support, and honest guidance for your UK ETA application.";
const url = "https://evisa-eta.co.uk/about";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "About Us", url: "https://evisa-eta.co.uk/about" },
        ]}
      />
      {children}
    </>
  );
}

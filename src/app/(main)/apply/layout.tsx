import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Apply for UK ETA - Start Your Electronic Travel Authorisation Application";
const description =
  "Start your UK ETA application online. Complete the simple step-by-step form and submit your Electronic Travel Authorisation application in minutes with expert review.";
const url = "https://evisa-eta.co.uk/apply";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Apply for UK ETA", url: "https://evisa-eta.co.uk/apply" },
        ]}
      />
      {children}
    </>
  );
}

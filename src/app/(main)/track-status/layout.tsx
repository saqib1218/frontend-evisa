import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Track Your UK ETA Application Status";
const description =
  "Track your UK ETA application status online. Enter your applicant ID and email to check your Electronic Travel Authorisation application progress.";
const url = "https://evisa-eta.co.uk/track-status";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function TrackStatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Track Application Status", url: "https://evisa-eta.co.uk/track-status" },
        ]}
      />
      {children}
    </>
  );
}

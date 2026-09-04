import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Cookie Policy - UK ETA Application Service";
const description = "Read the eVisa ETA cookie policy to understand how we use cookies on our UK Electronic Travel Authorisation application platform.";
const url = "https://evisa-eta.co.uk/cookie-policy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Cookie Policy", url },
        ]}
      />
      {children}
    </>
  );
}

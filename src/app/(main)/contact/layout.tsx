import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData/BreadcrumbSchema";

const title = "Contact Us - UK ETA Application Support";
const description =
  "Get in touch with eVisa ETA for any questions about your UK Electronic Travel Authorisation application. Our support team is here to help.";
const url = "https://evisa-eta.co.uk/contact";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://evisa-eta.co.uk/" },
          { name: "Contact Us", url: "https://evisa-eta.co.uk/contact" },
        ]}
      />
      {children}
    </>
  );
}

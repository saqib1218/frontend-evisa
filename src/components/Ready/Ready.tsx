import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ready from "@/images/ready.svg";

export default function Ready() {
  return (
    <div className="px-4 md:!px-10 md:!pb-[120px]" style={{ paddingBottom: "48px" }}>
      <div className="relative mx-auto overflow-hidden" style={{ maxWidth: "1360px", borderRadius: "16px" }}>
        <Image
          src={ready}
          alt="Ready to apply"
          width={1360}
          height={400}
          className="w-full md:!max-h-[450px]"
          style={{ objectFit: "cover", borderRadius: "16px", minHeight: "354px", height: "354px" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h2
            className="text-white text-center md:!text-[64px] md:!leading-[110%] md:!tracking-[-0.03em]"
            style={{
              fontSize: "32px",
              fontWeight: 500,
              lineHeight: "135%",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            Ready to apply for your eTA?
          </h2>
          <p
            className="text-white text-center md:!text-[18px] md:!leading-[140%] md:!tracking-[-0.02em]"
            style={{
              maxWidth: "570px",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "150%",
              letterSpacing: "-0.01em",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Answer a few quick questions, let our specialists review your details, and get your travel authorization approved, often within minutes.
          </p>
          <Link
            href="/apply"
            className="flex items-center justify-center gap-2 rounded-full bg-white text-primary transition-colors hover:bg-gray-100 w-full md:w-auto md:!max-w-[194px]"
            style={{
              height: "48px",
              gap: "8px",
              marginTop: "20px",
              paddingTop: "12px",
              paddingRight: "20px",
              paddingBottom: "12px",
              paddingLeft: "20px",
              borderRadius: "999px",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "150%",
              letterSpacing: "-0.01em",
            }}
          >
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DisclaimerPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/migration-rules");
  }, [router]);
  return null;
}

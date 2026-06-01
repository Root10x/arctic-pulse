"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      if (redirect) {
        router.replace(redirect);
      }
    }
  }, [router]);

  return null;
}

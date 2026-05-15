"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase";

/**
 * Initialises Firebase Analytics once the page is mounted in the browser.
 * This component renders nothing — it exists purely for the side-effect.
 * It is placed in the root layout so every page is tracked automatically.
 */
export default function AnalyticsProvider() {
  useEffect(() => {
    getFirebaseAnalytics().catch(console.error);
  }, []);

  return null;
}

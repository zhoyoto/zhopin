import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search AI Prompts & Inspirations | PromptNest AI",
  description: "Search thousands of AI prompts, room setups, wallpapers, and creative inspirations on PromptNest AI.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "80vh", background: "var(--bg-main)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(255,49,49,0.3)", borderTopColor: "#ff3131", animation: "rotate-slow 1s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
        </div>
      </div>
    }>
      <SearchPageClient />
    </Suspense>
  );
}

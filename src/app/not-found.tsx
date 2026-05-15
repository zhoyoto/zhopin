import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "404 – Page Not Found | PromptNest AI" };

export default function NotFound() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-main)", textAlign: "center", padding: "2rem" }}>
      <div>
        <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>🔍</div>
        <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
          404 <span className="gradient-text">Not Found</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", maxWidth: "440px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          Oops! This page seems to have wandered off into the AI universe. Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary" style={{ textDecoration: "none", padding: "0.75rem 1.5rem" }}>
            Go Home
          </Link>
          <Link href="/search" className="btn btn-secondary" style={{ textDecoration: "none", padding: "0.75rem 1.5rem", border: "1px solid var(--border)" }}>
            Search Prompts
          </Link>
        </div>
      </div>
    </div>
  );
}

import { MOCK_POSTS } from "@/lib/constants";
import InspirationCard from "@/components/cards/InspirationCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New AI Prompts & Inspirations | PromptNest AI",
  description: "Discover the latest and newest AI prompts, wallpapers, setups and inspirations posted on PromptNest AI.",
};

export default function NewPage() {
  const sorted = [...MOCK_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", paddingBottom: "4rem" }}>
      <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, var(--bg-secondary) 100%)", borderBottom: "1px solid var(--border)", padding: "3rem 0" }}>
        <div className="container-main">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "2rem" }}>✨</span>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
              Newest Additions
            </h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>
            Fresh AI prompts and inspirations, just added by our creators.
          </p>
        </div>
      </div>
      <div className="container-main" style={{ paddingTop: "2.5rem" }}>
        <div className="masonry-grid">
          {sorted.map((post) => <InspirationCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

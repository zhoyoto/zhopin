import { MOCK_POSTS } from "@/lib/constants";
import InspirationCard from "@/components/cards/InspirationCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending AI Prompts & Inspirations | PromptNest AI",
  description: "Discover the hottest trending AI prompts, room setups, and creative inspirations right now on PromptNest AI.",
};

export default function TrendingPage() {
  const trending = MOCK_POSTS.filter((p) => p.isTrending);

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", paddingBottom: "4rem" }}>
      <div style={{ background: "linear-gradient(135deg, rgba(255,49,49,0.08) 0%, var(--bg-secondary) 100%)", borderBottom: "1px solid var(--border)", padding: "3rem 0" }}>
        <div className="container-main">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "2rem" }}>🔥</span>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
              Trending Now
            </h1>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>
            The most popular AI prompts and inspirations the community is loving right now.
          </p>
        </div>
      </div>
      <div className="container-main" style={{ paddingTop: "2.5rem" }}>
        <div className="masonry-grid">
          {trending.map((post) => <InspirationCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import InspirationCard from "@/components/cards/InspirationCard";
import { MOCK_POSTS } from "@/lib/constants";
import { Post } from "@/lib/types";

interface MasonryGridProps {
  title?: string;
  subtitle?: string;
  initialPosts?: Post[];
  showHeader?: boolean;
  showFilters?: boolean;
  filterType?: "trending" | "new" | "all";
}

const SORT_OPTIONS = [
  { label: "🔥 Trending", value: "trending" },
  { label: "✨ Newest", value: "new" },
  { label: "❤️ Most Liked", value: "liked" },
  { label: "👁️ Most Viewed", value: "viewed" },
];

export default function MasonryGrid({
  title = "Trending Inspirations",
  subtitle = "Discover what the community loves most",
  initialPosts,
  showHeader = true,
  showFilters = true,
  filterType = "all",
}: MasonryGridProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeSort, setActiveSort] = useState("trending");
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));

    // Cycle through mock posts for demo
    const morePosts = MOCK_POSTS.map((p) => ({
      ...p,
      id: `${p.id}-${page + 1}`,
      slug: `${p.slug}-${page + 1}`,
    }));

    setPosts((prev) => [...prev, ...morePosts]);
    setPage((prev) => prev + 1);

    if (page >= 3) setHasMore(false);
    setIsLoading(false);
  }, [isLoading, hasMore, page]);

  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
    // In real app: re-fetch with new sort
    const sorted = [...MOCK_POSTS].sort(() => Math.random() - 0.5);
    setPosts(sorted);
  };

  return (
    <section style={{ padding: "2.5rem 0 4rem" }}>
      <div className="container-main">
        {showHeader && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <TrendingUp size={16} color="#ff3131" />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ff6b81", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {filterType === "trending" ? "🔥 Hot Right Now" : filterType === "new" ? "✨ Fresh & New" : "Explore All"}
                </span>
              </div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                }}
              >
                {title}
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginTop: "0.2rem" }}>
                {subtitle}
              </p>
            </div>

            <Link
              href="/search"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff6b81"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* Sort filters */}
        {showFilters && (
          <div className="scroll-row" style={{ marginBottom: "1.5rem" }}>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSortChange(opt.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor: activeSort === opt.value ? "rgba(255,49,49,0.4)" : "var(--border)",
                  background: activeSort === opt.value ? "rgba(255,49,49,0.12)" : "transparent",
                  color: activeSort === opt.value ? "#ff9eaa" : "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {posts.map((post, index) => (
            <InspirationCard
              key={`${post.id}-${index}`}
              post={post}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <button
              onClick={loadMore}
              disabled={isLoading}
              style={{
                padding: "0.875rem 2.5rem",
                borderRadius: "100px",
                border: "1px solid rgba(255,49,49,0.3)",
                background: "rgba(255,49,49,0.08)",
                color: "#ff9eaa",
                fontSize: "0.9375rem",
                fontWeight: 600,
                cursor: isLoading ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                transition: "all 0.2s ease",
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,49,49,0.15)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,49,49,0.5)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,49,49,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,49,49,0.3)";
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} style={{ animation: "rotate-slow 1s linear infinite" }} />
                  Loading more...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Load More Inspirations
                </>
              )}
            </button>
          </div>
        )}

        {!hasMore && (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-tertiary)", fontSize: "0.875rem" }}>
            You&apos;ve seen everything! 🎉
            <br />
            <Link href="/signup" style={{ color: "#ff6b81", textDecoration: "none", fontWeight: 500, marginTop: "0.5rem", display: "inline-block" }}>
              Sign up to discover more personalized content →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

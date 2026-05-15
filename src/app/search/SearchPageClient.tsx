"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, SlidersHorizontal } from "lucide-react";
import InspirationCard from "@/components/cards/InspirationCard";
import { MOCK_POSTS, CATEGORIES } from "@/lib/constants";
import { Post } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      let filtered = [...MOCK_POSTS];
      if (query.trim()) {
        const q = query.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.category.name.toLowerCase().includes(q)
        );
      }
      if (activeCategory) filtered = filtered.filter(p => p.category.slug === activeCategory);
      if (sortBy === "popular") filtered.sort((a, b) => b.stats.likes - a.stats.likes);
      if (sortBy === "trending") filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      if (sortBy === "recent") filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      setResults(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, activeCategory, sortBy]);

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Search Header */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "2.5rem 0" }}>
        <div className="container-main">
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
            {query ? `Results for "${query}"` : "Explore All"}
          </h1>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "280px", position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
              <input type="text" placeholder="Search AI prompts, room ideas, wallpapers..." value={query} onChange={e => setQuery(e.target.value)} className="input" style={{ paddingLeft: "2.75rem" }} />
              {query && <button onClick={() => setQuery("")} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}><X size={16} /></button>}
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="btn btn-secondary" style={{ border: "1px solid var(--border)" }}>
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
          {showFilters && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
              {[["popular", "❤️ Popular"], ["trending", "🔥 Trending"], ["recent", "✨ Recent"]].map(([v, l]) => (
                <button key={v} onClick={() => setSortBy(v)}
                  style={{ padding: "0.4rem 0.875rem", borderRadius: "100px", border: "1px solid", borderColor: sortBy === v ? "rgba(255,49,49,0.4)" : "var(--border)", background: sortBy === v ? "rgba(255,49,49,0.12)" : "transparent", color: sortBy === v ? "#ff9eaa" : "var(--text-secondary)", fontSize: "0.875rem", cursor: "pointer" }}>
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "2rem" }} className="search-layout">
          {/* Sidebar */}
          <aside className="search-sidebar">
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.25rem", position: "sticky", top: "90px" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff", marginBottom: "0.875rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Categories</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <button onClick={() => setActiveCategory(null)}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.625rem", borderRadius: "8px", border: "none", background: !activeCategory ? "rgba(255,49,49,0.12)" : "transparent", color: !activeCategory ? "#ff9eaa" : "var(--text-secondary)", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, textAlign: "left" }}>
                  ✨ All
                </button>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.slug === activeCategory ? null : cat.slug)}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.625rem", borderRadius: "8px", border: "none", background: activeCategory === cat.slug ? "rgba(255,49,49,0.12)" : "transparent", color: activeCategory === cat.slug ? "#ff9eaa" : "var(--text-secondary)", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500, textAlign: "left", width: "100%" }}>
                    <span>{cat.icon}</span>
                    <span style={{ flex: 1 }}>{cat.name}</span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{cat.postCount}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <main>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginBottom: "1.25rem" }}>
              {isLoading ? "Searching..." : <><strong style={{ color: "#fff" }}>{results.length}</strong> results found</>}
            </p>
            {isLoading ? (
              <div className="masonry-grid">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="masonry-grid-item">
                    <div className="skeleton" style={{ height: `${180 + (i % 3) * 80}px`, borderRadius: "16px" }} />
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>No results found</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>Try different keywords or browse our categories</p>
                <Link href="/search" className="btn btn-primary" style={{ textDecoration: "none" }}>Browse All</Link>
              </div>
            ) : (
              <div className="masonry-grid">
                {results.map(post => <InspirationCard key={post.id} post={post} />)}
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .search-layout { grid-template-columns: 1fr !important; }
          .search-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Search, Edit2, Trash2, Eye, Star } from "lucide-react";
import { MOCK_POSTS } from "@/lib/constants";
import { formatNumber, formatDate } from "@/lib/utils";

export default function AdminPostsPage() {
  const [searchQ, setSearchQ] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = MOCK_POSTS.filter(p =>
    !searchQ || p.title.toLowerCase().includes(searchQ.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={{ padding: "2rem", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>Posts</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{MOCK_POSTS.length} total posts</p>
        </div>
        <Link href="/admin/posts/create" className="btn btn-primary" style={{ textDecoration: "none" }}>
          <PlusCircle size={16} /> Create Post
        </Link>
      </div>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
          <input type="text" placeholder="Search posts..." value={searchQ} onChange={e => setSearchQ(e.target.value)} className="input" style={{ paddingLeft: "2.5rem" }} />
        </div>
        {selectedIds.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-secondary" style={{ fontSize: "0.875rem", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
              <Trash2 size={14} /> Delete ({selectedIds.length})
            </button>
            <button className="btn btn-secondary" style={{ fontSize: "0.875rem", border: "1px solid rgba(255,49,49,0.3)", color: "#ff9eaa" }}>
              <Star size={14} /> Feature
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "1rem 1.25rem", width: "40px" }}>
                <input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? MOCK_POSTS.map(p => p.id) : [])} checked={selectedIds.length === MOCK_POSTS.length} style={{ cursor: "pointer" }} />
              </th>
              {["Post", "Category", "Stats", "Status", "Date", "Actions"].map(h => (
                <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((post, i) => (
              <tr key={post.id}
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: selectedIds.includes(post.id) ? "rgba(255,49,49,0.04)" : "transparent" }}>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <input type="checkbox" checked={selectedIds.includes(post.id)} onChange={() => toggleSelect(post.id)} style={{ cursor: "pointer" }} />
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img src={post.featuredImage.url} alt={post.title} style={{ width: "48px", height: "36px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    <div>
                      <p className="line-clamp-1" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", maxWidth: "220px" }}>{post.title}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>/{post.slug}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "1rem 1.25rem", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{post.category.icon} {post.category.name}</span>
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                    <div>👁 {formatNumber(post.stats.views)}</div>
                    <div>❤️ {formatNumber(post.stats.likes)}</div>
                  </div>
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {post.isFeatured && <span className="badge badge-accent" style={{ fontSize: "0.7rem" }}>⭐ Featured</span>}
                    {post.isTrending && <span className="badge badge-accent" style={{ fontSize: "0.7rem" }}>🔥 Trending</span>}
                    {!post.isFeatured && !post.isTrending && <span className="badge badge-success" style={{ fontSize: "0.7rem" }}>✓ Published</span>}
                  </div>
                </td>
                <td style={{ padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--text-tertiary)", whiteSpace: "nowrap" }}>
                  {formatDate(post.publishedAt)}
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    <Link href={`/admin/posts/${post.id}/edit`}
                      style={{ width: "30px", height: "30px", borderRadius: "7px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textDecoration: "none", transition: "all 0.15s" }}>
                      <Edit2 size={13} />
                    </Link>
                    <Link href={`/prompt/${post.slug}`} target="_blank"
                      style={{ width: "30px", height: "30px", borderRadius: "7px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textDecoration: "none" }}>
                      <Eye size={13} />
                    </Link>
                    <button
                      style={{ width: "30px", height: "30px", borderRadius: "7px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Eye, Heart, Bookmark, Users, TrendingUp, PlusCircle, ArrowUpRight, Activity } from "lucide-react";
import { MOCK_POSTS, MOCK_USERS } from "@/lib/constants";
import { formatNumber, formatDate } from "@/lib/utils";

const STATS = [
  { label: "Total Posts", value: "245", icon: <TrendingUp size={20} />, change: "+12 this week", color: "#ff3131" },
  { label: "Total Views", value: "2.1M", icon: <Eye size={20} />, change: "+18% this month", color: "#0ea5e9" },
  { label: "Total Saves", value: "89.4K", icon: <Bookmark size={20} />, change: "+8% this month", color: "#8b5cf6" },
  { label: "Total Users", value: "12.5K", icon: <Users size={20} />, change: "+340 this week", color: "#10b981" },
];

export default function AdminDashboard() {
  return (
    <div style={{ padding: "2rem", background: "var(--bg-main)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>Welcome back, Admin! Here&apos;s what&apos;s happening.</p>
        </div>
        <Link href="/admin/posts/create" className="btn btn-primary" style={{ textDecoration: "none", padding: "0.625rem 1.25rem" }}>
          <PlusCircle size={16} /> Create Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {STATS.map(stat => (
          <div key={stat.label} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${stat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                {stat.icon}
              </div>
              <ArrowUpRight size={16} color="#10b981" />
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem", fontFamily: "var(--font-heading)" }}>{stat.value}</div>
            <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginBottom: "0.25rem" }}>{stat.label}</div>
            <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 500 }}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem" }}>
        {/* Recent Posts Table */}
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Recent Posts</h2>
            <Link href="/admin/posts" style={{ fontSize: "0.8125rem", color: "#ff6b81", textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Title", "Category", "Views", "Likes", "Status", "Actions"].map(h => (
                    <th key={h} style={{ padding: "0.75rem 1.5rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_POSTS.slice(0, 8).map((post, i) => (
                  <tr key={post.id} style={{ borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td style={{ padding: "0.875rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <img src={post.featuredImage.url} alt={post.title} style={{ width: "36px", height: "28px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} />
                        <span className="line-clamp-1" style={{ fontSize: "0.875rem", color: "#fff", fontWeight: 500, maxWidth: "200px" }}>{post.title}</span>
                      </div>
                    </td>
                    <td style={{ padding: "0.875rem 1.5rem" }}>
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{post.category.icon} {post.category.name}</span>
                    </td>
                    <td style={{ padding: "0.875rem 1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{formatNumber(post.stats.views)}</td>
                    <td style={{ padding: "0.875rem 1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{formatNumber(post.stats.likes)}</td>
                    <td style={{ padding: "0.875rem 1.5rem" }}>
                      <span style={{ padding: "0.2rem 0.5rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600, background: post.isTrending ? "rgba(255,49,49,0.15)" : "rgba(16,185,129,0.15)", color: post.isTrending ? "#ff9eaa" : "#10b981" }}>
                        {post.isTrending ? "🔥 Trending" : "✓ Published"}
                      </span>
                    </td>
                    <td style={{ padding: "0.875rem 1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.375rem" }}>
                        <Link href={`/admin/posts/${post.id}/edit`} style={{ padding: "0.25rem 0.625rem", borderRadius: "6px", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 500, textDecoration: "none", transition: "all 0.15s" }}>Edit</Link>
                        <Link href={`/prompt/${post.slug}`} style={{ padding: "0.25rem 0.625rem", borderRadius: "6px", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.75rem", fontWeight: 500, textDecoration: "none" }}>View</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Recent Activity */}
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", padding: "1.25rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Activity size={16} color="#ff3131" /> Recent Activity
            </h2>
            {[
              { msg: "New post published: Cinematic AI Workspace", time: "2m ago", icon: "📄" },
              { msg: "Comment moderated on Gaming Setup", time: "15m ago", icon: "💬" },
              { msg: "500 new followers this week", time: "1h ago", icon: "👥" },
              { msg: "Featured: Dark Forest Fantasy Art", time: "3h ago", icon: "⭐" },
              { msg: "Trending: Stable Diffusion Master Pack", time: "5h ago", icon: "🔥" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", paddingBottom: "0.75rem", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>{item.msg}</p>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Top Creators */}
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", padding: "1.25rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Top Creators</h2>
            {MOCK_USERS.slice(0, 4).map((user, i) => (
              <div key={user.uid} style={{ display: "flex", alignItems: "center", gap: "0.625rem", paddingBottom: "0.75rem", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none", marginBottom: "0.625rem" }}>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--text-tertiary)", width: "18px" }}>#{i + 1}</span>
                <img src={user.avatar} alt={user.displayName} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>{user.displayName}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{formatNumber(user.followerCount)} followers</p>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{user.postCount} posts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

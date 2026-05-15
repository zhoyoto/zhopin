"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Heart, Bookmark, ArrowRight, ExternalLink } from "lucide-react";
import { FEATURED_POST } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export default function FeaturedSpotlight() {
  const post = FEATURED_POST;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section style={{ padding: "3rem 0" }}>
      <div className="container-main">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ff6b81", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                ⭐ Featured Spotlight
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
              Editor&apos;s Pick
            </h2>
          </div>
          <Link
            href="/search?featured=true"
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
            View all featured
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Featured Card */}
        <Link
          href={`/prompt/${post.slug}`}
          style={{ display: "block", textDecoration: "none" }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.4s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,49,49,0.3)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,49,49,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Background image */}
            <img
              src="https://picsum.photos/seed/featured/1400/500"
              alt={post.title}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease",
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <div style={{ flex: 1, maxWidth: "600px" }}>
                {/* Badges */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.875rem" }}>
                  <span style={{
                    padding: "0.25rem 0.625rem",
                    borderRadius: "100px",
                    background: "rgba(255,49,49,0.8)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}>
                    ⭐ FEATURED
                  </span>
                  <span style={{
                    padding: "0.25rem 0.625rem",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backdropFilter: "blur(8px)",
                  }}>
                    {post.category.icon} {post.category.name}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "0.625rem",
                    fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {post.title}
                </h3>

                <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {post.description.slice(0, 120)}...
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <img
                    src={post.author.avatar}
                    alt={post.author.displayName}
                    style={{ width: "28px", height: "28px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)" }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                    @{post.author.username}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", flexShrink: 0 }}>
                {/* Stats */}
                <div style={{ display: "flex", gap: "1.25rem" }}>
                  {[
                    { icon: <Heart size={16} />, value: formatNumber(post.stats.likes), label: "Likes" },
                    { icon: <Bookmark size={16} />, value: formatNumber(post.stats.saves), label: "Saved" },
                    { icon: <Eye size={16} />, value: formatNumber(post.stats.views), label: "Views" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                        {stat.icon}
                        {stat.value}
                      </div>
                      <div style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)", marginTop: "0.1rem" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="btn btn-primary"
                  style={{ padding: "0.75rem 1.5rem", borderRadius: "10px" }}
                >
                  <ExternalLink size={15} />
                  View Details
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

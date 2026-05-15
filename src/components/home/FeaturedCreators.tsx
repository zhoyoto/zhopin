"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Users, ArrowRight } from "lucide-react";
import { MOCK_USERS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export default function FeaturedCreators() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "0 0 4rem" }}>
      <div className="container-main">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <Users size={15} color="#ff3131" />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ff6b81", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Top Creators
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
              Featured Creators
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginTop: "0.2rem" }}>
              Follow the most inspiring AI creators
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Link
              href="/creators"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                textDecoration: "none",
                fontWeight: 500,
                marginRight: "0.75rem",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff6b81"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
            >
              View all
              <ArrowRight size={15} />
            </Link>
            <button
              onClick={() => scroll("left")}
              style={{
                width: "34px", height: "34px", borderRadius: "50%", border: "1px solid var(--border)",
                background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-secondary)",
              }}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => scroll("right")}
              style={{
                width: "34px", height: "34px", borderRadius: "50%", border: "1px solid var(--border)",
                background: "var(--bg-elevated)", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-secondary)",
              }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="scroll-row" style={{ gap: "1rem" }}>
          {MOCK_USERS.map((creator) => (
            <CreatorCard key={creator.uid} creator={creator} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreatorCard({ creator }: { creator: typeof MOCK_USERS[0] }) {
  const [isFollowing, setIsFollowing] = React.useState(false);

  return (
    <div
      style={{
        flexShrink: 0,
        width: "220px",
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: "1.5rem 1.25rem",
        textAlign: "center",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Avatar */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
        <img
          src={creator.avatar}
          alt={creator.displayName}
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: "3px solid rgba(255,49,49,0.3)",
            objectFit: "cover",
          }}
        />
        {creator.isCreator && (
          <div style={{
            position: "absolute",
            bottom: "2px",
            right: "2px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff3131, #ff6b81)",
            border: "2px solid var(--bg-elevated)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
          }}>
            ✓
          </div>
        )}
      </div>

      <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>
        {creator.displayName}
      </h3>
      <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginBottom: "0.75rem" }}>
        @{creator.username}
      </p>
      <p className="line-clamp-2" style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
        {creator.bio}
      </p>

      {/* Stats */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginBottom: "1.25rem" }}>
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>
            {formatNumber(creator.followerCount)}
          </div>
          <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>Followers</div>
        </div>
        <div style={{ width: "1px", background: "var(--border)" }} />
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>
            {creator.postCount}
          </div>
          <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>Posts</div>
        </div>
      </div>

      {/* Follow Button */}
      <button
        onClick={() => setIsFollowing(!isFollowing)}
        style={{
          width: "100%",
          padding: "0.5625rem",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: isFollowing ? "rgba(255,255,255,0.12)" : "rgba(255,49,49,0.4)",
          background: isFollowing ? "rgba(255,255,255,0.06)" : "rgba(255,49,49,0.12)",
          color: isFollowing ? "var(--text-secondary)" : "#ff9eaa",
          fontSize: "0.875rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {isFollowing ? "✓ Following" : "+ Follow"}
      </button>
    </div>
  );
}

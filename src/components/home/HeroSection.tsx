"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import { TRENDING_TAGS } from "@/lib/constants";

const HERO_STATS = [
  { value: "50K+", label: "Active Creators" },
  { value: "500K+", label: "Prompts Shared" },
  { value: "2M+", label: "Monthly Views" },
];

const ROTATING_WORDS = ["Creativity", "Innovation", "Inspiration", "Excellence"];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-deep)",
      }}
    >
      {/* Animated Background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,49,49,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "40%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,129,0.06) 0%, transparent 70%)",
            filter: "blur(30px)",
            animation: "float 4s ease-in-out infinite 2s",
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to bottom, transparent, var(--bg-main))",
          }}
        />
      </div>

      <div className="container-main" style={{ position: "relative", zIndex: 1, paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
          className="hero-grid"
        >
          {/* Left: Text Content */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.875rem",
                borderRadius: "100px",
                background: "rgba(255,49,49,0.12)",
                border: "1px solid rgba(255,49,49,0.25)",
                marginBottom: "1.5rem",
              }}
            >
              <Sparkles size={13} color="#ff6b81" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ff9eaa" }}>
                The #1 AI Prompt Discovery Platform
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "0.5rem",
              }}
            >
              Discover AI Inspirations
              <br />
              That Spark{" "}
              <span
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #ff3131 0%, #ff6b81 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  minWidth: "200px",
                  transition: "opacity 0.3s ease",
                }}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: "1.0625rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "480px",
                marginBottom: "2rem",
                marginTop: "1rem",
              }}
            >
              Curated prompts, stunning visuals, and endless inspiration. From AI
              art to room setups, productivity to fashion — all in one place.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "1.5rem",
                maxWidth: "520px",
              }}
            >
              <div style={{ flex: 1, position: "relative" }}>
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search AI prompts, room ideas, quotes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1rem 0.875rem 2.75rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "0.9375rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,49,49,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,49,49,0.1)";
                    e.target.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: "0.875rem 1.25rem", borderRadius: "12px", flexShrink: 0 }}
              >
                <Search size={16} />
              </button>
            </form>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <Link
                href="/search"
                className="btn btn-primary"
                style={{ padding: "0.75rem 1.5rem", borderRadius: "10px", textDecoration: "none" }}
              >
                Explore Now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/trending"
                className="btn btn-secondary"
                style={{ padding: "0.75rem 1.5rem", borderRadius: "10px", textDecoration: "none" }}
              >
                <TrendingUp size={16} />
                Trending
              </Link>
            </div>

            {/* Trending Tags */}
            <div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.625rem", fontWeight: 500 }}>
                Trending right now:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {TRENDING_TAGS.slice(0, 6).map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="tag-chip"
                    style={{ textDecoration: "none", fontSize: "0.75rem" }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                flexWrap: "wrap",
              }}
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                      background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Collage */}
          <div
            className="hero-visual"
            style={{
              position: "relative",
              height: "550px",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(32px)",
              transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
            }}
          >
            {/* Main large card */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "64%",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                animation: "float 5s ease-in-out infinite",
              }}
            >
              <img
                src="https://picsum.photos/seed/hero1/500/380"
                alt="Featured AI creation"
                style={{ width: "100%", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
              }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>Cinematic Workspace AI</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>❤️ 2.4K  💾 890</p>
              </div>
            </div>

            {/* Top-right card */}
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "34%",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                animation: "float 6s ease-in-out infinite 1s",
              }}
            >
              <img
                src="https://picsum.photos/seed/hero2/300/280"
                alt="AI art"
                style={{ width: "100%", display: "block" }}
              />
            </div>

            {/* Bottom-right card */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "44%",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                animation: "float 4s ease-in-out infinite 0.5s",
              }}
            >
              <img
                src="https://picsum.photos/seed/hero3/350/220"
                alt="Room setup"
                style={{ width: "100%", display: "block" }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "0.75rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff" }}>Neon Gaming Setup</p>
              </div>
            </div>

            {/* Bottom-left small card */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "34%",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                animation: "float 7s ease-in-out infinite 1.5s",
              }}
            >
              <img
                src="https://picsum.photos/seed/hero4/260/200"
                alt="AI prompt"
                style={{ width: "100%", display: "block" }}
              />
            </div>

            {/* Floating stat badge */}
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "55%",
                transform: "translate(-50%, -50%)",
                background: "rgba(18,18,24,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,49,49,0.3)",
                borderRadius: "12px",
                padding: "0.75rem 1rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,49,49,0.15)",
                zIndex: 10,
                animation: "float 3s ease-in-out infinite 2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                  Live • 1,247 online
                </span>
              </div>
            </div>

            {/* Users badge */}
            <div
              style={{
                position: "absolute",
                bottom: "36%",
                right: "-16px",
                background: "rgba(18,18,24,0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "0.625rem 0.875rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <Users size={13} color="#ff6b81" />
                <span style={{ fontSize: "0.75rem", color: "#fff", fontWeight: 600 }}>50K+ Creators</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-visual {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

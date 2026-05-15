"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";

export default function CategoriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      style={{
        padding: "2.5rem 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container-main">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
              }}
            >
              Top Categories
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginTop: "0.2rem" }}>
              Explore by what inspires you
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => scroll("left")}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--bg-elevated)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-active)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scroll-row"
          style={{ gap: "0.75rem", paddingBottom: "0.5rem" }}
        >
          {/* "All" chip */}
          <Link
            href="/search"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: !activeCategory ? "rgba(255,49,49,0.12)" : "var(--bg-elevated)",
              border: "1px solid",
              borderColor: !activeCategory ? "rgba(255,49,49,0.3)" : "var(--border)",
              textDecoration: "none",
              flexShrink: 0,
              transition: "all 0.2s ease",
              minWidth: "80px",
            }}
            onClick={() => setActiveCategory(null)}
          >
            <span style={{ fontSize: "1.5rem" }}>✨</span>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: !activeCategory ? "#ff9eaa" : "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              All
            </span>
          </Link>

          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "14px",
                  background: isActive ? `${category.color}1a` : "var(--bg-elevated)",
                  border: "1px solid",
                  borderColor: isActive ? `${category.color}44` : "var(--border)",
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                  minWidth: "90px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = `${category.color}0f`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${category.color}33`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }
                }}
              >
                <span style={{ fontSize: "1.625rem" }}>{category.icon}</span>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: isActive ? category.color : "var(--text-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {category.name}
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: "0.1rem" }}>
                    {formatNumber(category.postCount)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

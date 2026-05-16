"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Bookmark, Eye, Share2, MoreVertical, Copy, ExternalLink } from "lucide-react";
import { Post } from "@/lib/types";
import { formatNumber, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { openAuthModal } from "@/components/GlobalAuthModal";
import { onAuthChange } from "@/lib/auth";
import type { User } from "firebase/auth";
import { useEffect } from "react";

interface InspirationCardProps {
  post: Post;
  className?: string;
}

export default function InspirationCard({ post, className }: InspirationCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthChange((u) => setUser(u));
    return unsub;
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { openAuthModal(); return; }
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { openAuthModal(); return; }
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.share?.({
      title: post.title,
      url: `${window.location.origin}/prompt/${post.slug}`,
    });
  };

  return (
    <div
      className={cn("masonry-grid-item", className)}
      style={{ display: "block" }}
    >
      <Link
        href={`/prompt/${post.slug}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <article
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,49,49,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {!isImageLoaded && (
              <div
                className="skeleton"
                style={{
                  aspectRatio: `${post.featuredImage.width}/${post.featuredImage.height}`,
                  width: "100%",
                }}
              />
            )}
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
              style={{
                width: "100%",
                display: "block",
                opacity: isImageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
              className="card-overlay"
            />

            {/* Badges */}
            <div style={{ position: "absolute", top: "0.625rem", left: "0.625rem", display: "flex", gap: "0.375rem" }}>
              {post.isTrending && (
                <span
                  style={{
                    padding: "0.2rem 0.5rem",
                    borderRadius: "100px",
                    background: "rgba(255,49,49,0.85)",
                    color: "#fff",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    backdropFilter: "blur(8px)",
                    letterSpacing: "0.03em",
                  }}
                >
                  🔥 HOT
                </span>
              )}
              {post.isFeatured && (
                <span
                  style={{
                    padding: "0.2rem 0.5rem",
                    borderRadius: "100px",
                    background: "rgba(139,92,246,0.85)",
                    color: "#fff",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    backdropFilter: "blur(8px)",
                    letterSpacing: "0.03em",
                  }}
                >
                  ⭐ FEATURED
                </span>
              )}
            </div>

            {/* Quick Actions (visible on hover) */}
            <div
              style={{
                position: "absolute",
                top: "0.625rem",
                right: "0.625rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.375rem",
                opacity: 0,
                transform: "translateX(8px)",
                transition: "all 0.2s ease",
              }}
              className="card-actions"
            >
              <button
                onClick={handleSave}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  background: "rgba(18,18,24,0.8)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: isSaved ? "#ff3131" : "#fff",
                  transition: "all 0.2s ease",
                }}
                title={isSaved ? "Remove from saved" : "Save"}
              >
                <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  background: "rgba(18,18,24,0.8)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                }}
                title="Share"
              >
                <Share2 size={15} />
              </button>
            </div>

            {/* Category pill */}
            <div style={{ position: "absolute", bottom: "0.625rem", left: "0.625rem" }}>
              <span
                style={{
                  padding: "0.2rem 0.5rem",
                  borderRadius: "100px",
                  background: "rgba(18,18,24,0.75)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {post.category.icon} {post.category.name}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div style={{ padding: "0.875rem" }}>
            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
              <img
                src={post.author.avatar}
                alt={post.author.displayName}
                style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                {post.author.displayName}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginLeft: "auto" }}>
                {formatDate(post.publishedAt)}
              </span>
            </div>

            {/* Title */}
            <h3
              className="line-clamp-2"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.4,
                marginBottom: "0.625rem",
              }}
            >
              {post.title}
            </h3>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.75rem" }}>
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag-chip" style={{ fontSize: "0.6875rem", padding: "0.15rem 0.5rem" }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div className="stat-row">
                <span>
                  <Eye size={12} />
                  {formatNumber(post.stats.views)}
                </span>
                <span>
                  <Bookmark size={12} />
                  {formatNumber(post.stats.saves)}
                </span>
              </div>

              <button
                onClick={handleLike}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.3rem 0.625rem",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor: isLiked ? "rgba(255,49,49,0.4)" : "rgba(255,255,255,0.08)",
                  background: isLiked ? "rgba(255,49,49,0.12)" : "transparent",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: isLiked ? "#ff6b81" : "var(--text-secondary)",
                  transition: "all 0.2s ease",
                }}
              >
                <Heart
                  size={12}
                  fill={isLiked ? "currentColor" : "none"}
                  style={{ transition: "transform 0.2s ease" }}
                  className={isLiked ? "animate-heart-beat" : ""}
                />
                {formatNumber(likeCount)}
              </button>
            </div>
          </div>
        </article>
      </Link>

      <style jsx>{`
        article:hover .card-overlay {
          opacity: 1;
        }
        article:hover .card-actions {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </div>
  );
}

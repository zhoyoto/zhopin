"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Bookmark, Share2, Copy, Check, ChevronLeft, ChevronRight, Eye, MessageCircle, ExternalLink } from "lucide-react";
import { Post } from "@/lib/types";
import { formatNumber, formatDate, copyToClipboard } from "@/lib/utils";
import InspirationCard from "@/components/cards/InspirationCard";
import GoogleAd from "@/components/GoogleAd";
import { openAuthModal } from "@/components/GlobalAuthModal";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";

interface Props {
  post: Post;
  similarPosts: Post[];
}

export default function PostDetailClient({ post, similarPosts }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [activeImage, setActiveImage] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleCopyPrompt = async () => {
    await copyToClipboard(post.prompt.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank");
  };

  const allImages = [post.featuredImage, ...post.images];

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", paddingBottom: "4rem" }}>
      <div className="container-main" style={{ paddingTop: "2rem" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
          <Link href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href={`/category/${post.category.slug}`} style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>{post.category.name}</Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }} className="line-clamp-1">{post.title}</span>
        </nav>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem" }} className="post-layout">
          {/* Left: Main Content */}
          <div>
            {/* Featured Image */}
            <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--border)" }}>
              <img src={allImages[activeImage]?.url} alt={allImages[activeImage]?.alt} style={{ width: "100%", maxHeight: "520px", objectFit: "cover", display: "block" }} />
            </div>

            {/* Action Bar */}
            <div style={{ display: "flex", gap: "0.625rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <button 
                onClick={() => { 
                  if (!user) { openAuthModal(); return; }
                  setIsLiked(!isLiked); 
                  setLikeCount(p => isLiked ? p - 1 : p + 1); 
                }}
                className="btn" style={{ padding: "0.625rem 1rem", border: "1px solid", borderColor: isLiked ? "rgba(255,49,49,0.4)" : "var(--border)", background: isLiked ? "rgba(255,49,49,0.12)" : "transparent", color: isLiked ? "#ff6b81" : "var(--text-secondary)" }}>
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {formatNumber(likeCount)}
              </button>
              <button 
                onClick={() => {
                  if (!user) { openAuthModal(); return; }
                  setIsSaved(!isSaved);
                }}
                className="btn" style={{ padding: "0.625rem 1rem", border: "1px solid", borderColor: isSaved ? "rgba(139,92,246,0.4)" : "var(--border)", background: isSaved ? "rgba(139,92,246,0.12)" : "transparent", color: isSaved ? "#a78bfa" : "var(--text-secondary)" }}>
                <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} /> {isSaved ? "Saved" : "Save"}
              </button>
              <button onClick={() => handleShare("twitter")} className="btn btn-ghost" style={{ padding: "0.625rem 1rem", border: "1px solid var(--border)" }}>
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Title & Meta */}
            <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem", lineHeight: 1.2, fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
              {post.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img src={post.author.avatar} alt={post.author.displayName} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(255,49,49,0.3)" }} />
                <Link href={`/creator/${post.author.uid}`} style={{ fontWeight: 600, color: "#fff", textDecoration: "none", fontSize: "0.9375rem" }}>
                  {post.author.displayName}
                </Link>
              </div>
              <span style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>•</span>
              <span style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>{formatDate(post.publishedAt)}</span>
              <div className="stat-row">
                <span><Eye size={14} />{formatNumber(post.stats.views)}</span>
                <span><MessageCircle size={14} />{post.stats.comments}</span>
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
              {post.tags.map((tag) => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="tag-chip" style={{ textDecoration: "none" }}>#{tag}</Link>
              ))}
            </div>

            {/* Description */}
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1rem" }}>{post.description}</p>
            </div>

            {/* Prompt Section */}
            <div style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,49,49,0.2)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>AI Prompt</h2>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span className="badge badge-accent">{post.prompt.model}</span>
                    <span className="badge" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}>{post.prompt.difficulty}</span>
                  </div>
                </div>
                <button onClick={handleCopyPrompt} className="btn btn-primary" style={{ padding: "0.625rem 1.25rem" }}>
                  {isCopied ? <><Check size={15} /> Copied!</> : <><Copy size={15} /> Copy Prompt</>}
                </button>
              </div>
              <div style={{ background: "var(--bg-deep)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.25rem", fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", fontSize: "0.875rem", color: "#b4b4c5", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {post.prompt.text}
              </div>
            </div>

            {/* Image Gallery */}
            {allImages.length > 1 && (
              <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
                  Gallery ({allImages.length} images)
                </h2>
                <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      style={{ flexShrink: 0, width: "80px", height: "60px", borderRadius: "8px", overflow: "hidden", border: `2px solid ${activeImage === i ? "#ff3131" : "transparent"}`, cursor: "pointer", padding: 0 }}>
                      <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
                  <button onClick={() => setActiveImage(p => Math.max(0, p - 1))} disabled={activeImage === 0}
                    className="btn btn-ghost" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", opacity: activeImage === 0 ? 0.4 : 1 }}>
                    <ChevronLeft size={16} /> Prev
                  </button>
                  <span style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>{activeImage + 1} / {allImages.length}</span>
                  <button onClick={() => setActiveImage(p => Math.min(allImages.length - 1, p + 1))} disabled={activeImage === allImages.length - 1}
                    className="btn btn-ghost" style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", opacity: activeImage === allImages.length - 1 ? 0.4 : 1 }}>
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            <GoogleAd slot="2616084302" className="my-6" />

            {/* Comments Section */}
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>
                {post.stats.comments} Comments
              </h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  style={{ width: "100%", padding: "0.875rem 1rem", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "12px", color: "#fff", fontSize: "0.9375rem", resize: "vertical", minHeight: "100px", outline: "none", fontFamily: "inherit" }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.625rem" }}>
                  <button className="btn btn-primary" style={{ padding: "0.5rem 1.25rem" }} onClick={() => setComment("")}>Post Comment</button>
                </div>
              </div>
              {/* Mock comments */}
              {[
                { name: "Alex M.", text: "Absolutely stunning prompts! The cinematic quality is incredible.", time: "2 days ago" },
                { name: "Sarah K.", text: "Used this for my portfolio shoot. Results were amazing!", time: "5 days ago" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", paddingBottom: "1rem", borderBottom: i === 1 ? "none" : "1px solid var(--border)", marginBottom: "1rem" }}>
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${c.name}`} alt={c.name} style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0 }} />
                  <div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem" }}>
                      <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.875rem" }}>{c.name}</span>
                      <span style={{ color: "var(--text-tertiary)", fontSize: "0.75rem" }}>{c.time}</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Similar Posts */}
            {similarPosts.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Similar Prompts</h2>
                <div className="masonry-grid" style={{ columns: 2 }}>
                  {similarPosts.map((p) => <InspirationCard key={p.id} post={p} />)}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside>
            {/* Creator Card */}
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", padding: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
              <img src={post.author.avatar} alt={post.author.displayName} style={{ width: "72px", height: "72px", borderRadius: "50%", border: "3px solid rgba(255,49,49,0.3)", marginBottom: "0.75rem" }} />
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>{post.author.displayName}</h3>
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem", marginBottom: "0.625rem" }}>@{post.author.username}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.8125rem", lineHeight: 1.5, marginBottom: "1rem" }}>{post.author.bio}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9375rem" }}>{formatNumber(post.author.followerCount)}</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>Followers</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9375rem" }}>{post.author.postCount}</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>Posts</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => setIsFollowing(!isFollowing)} className="btn" style={{ flex: 1, padding: "0.5625rem", border: "1px solid", borderColor: isFollowing ? "var(--border)" : "rgba(255,49,49,0.4)", background: isFollowing ? "transparent" : "rgba(255,49,49,0.12)", color: isFollowing ? "var(--text-secondary)" : "#ff9eaa" }}>
                  {isFollowing ? "✓ Following" : "+ Follow"}
                </button>
                <Link href={`/creator/${post.author.uid}`} className="btn btn-ghost" style={{ border: "1px solid var(--border)", padding: "0.5625rem 0.75rem", textDecoration: "none" }}>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Post Info */}
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.25rem", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", marginBottom: "1rem" }}>Post Details</h3>
              {[
                { label: "Category", value: `${post.category.icon} ${post.category.name}` },
                { label: "Model", value: post.prompt.model },
                { label: "Difficulty", value: post.prompt.difficulty },
                { label: "Views", value: formatNumber(post.stats.views) },
                { label: "Saves", value: formatNumber(post.stats.saves) },
                { label: "Published", value: formatDate(post.publishedAt) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>{label}</span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontWeight: 500, textAlign: "right" }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Share */}
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.25rem" }}>
              <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", marginBottom: "1rem" }}>Share This</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {[
                  { label: "Twitter", icon: "𝕏", color: "#1da1f2", platform: "twitter" },
                  { label: "Pinterest", icon: "📌", color: "#e60023", platform: "pinterest" },
                  { label: "Facebook", icon: "👍", color: "#1877f2", platform: "facebook" },
                  { label: "Copy Link", icon: <Copy size={14} />, color: "#8b5cf6", platform: "copy" },
                ].map((s) => (
                  <button key={s.platform} onClick={() => s.platform === "copy" ? copyToClipboard(window.location.href) : handleShare(s.platform)}
                    style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 0.625rem", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", color: "var(--text-secondary)", fontSize: "0.8125rem", fontWeight: 500, transition: "all 0.2s", justifyContent: "center" }}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            <GoogleAd slot="2616084302" className="mt-6" />
          </aside>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .post-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

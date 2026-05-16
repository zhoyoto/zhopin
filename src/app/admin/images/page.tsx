"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/db";
import { ImageIcon, Search, Filter, Trash2, ExternalLink, MoreVertical } from "lucide-react";

export default function AdminImages() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const allImages: any[] = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.featuredImage) {
          allImages.push({
            id: doc.id + "_feat",
            url: data.featuredImage.url,
            alt: data.featuredImage.alt,
            postTitle: data.title,
            postId: doc.id
          });
        }
        if (data.images && Array.isArray(data.images)) {
          data.images.forEach((img: any, idx: number) => {
            allImages.push({
              id: doc.id + "_gallery_" + idx,
              url: img.url,
              alt: img.alt,
              postTitle: data.title,
              postId: doc.id
            });
          });
        }
      });
      setImages(allImages);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), sans-serif" }}>
            Media Library
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>Manage and view all images uploaded across posts.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input type="text" placeholder="Search images..." style={{ padding: "0.625rem 1rem 0.625rem 2.5rem", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "10px", color: "#fff", fontSize: "0.875rem", outline: "none", width: "240px" }} />
          </div>
          <button className="btn btn-secondary" style={{ padding: "0.625rem 1rem", border: "1px solid var(--border)" }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,49,49,0.1)", borderTopColor: "#ff3131", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      ) : images.length === 0 ? (
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", padding: "4rem", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--text-tertiary)" }}>
            <ImageIcon size={32} />
          </div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>No images found</h3>
          <p style={{ color: "var(--text-tertiary)", maxWidth: "300px", margin: "0 auto" }}>Images will appear here once you start creating posts with visuals.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
          {images.map((img) => (
            <div key={img.id} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", transition: "transform 0.2s" }} className="image-card">
              <div style={{ position: "relative", aspectRatio: "4/3", background: "#000" }}>
                <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "flex-end", padding: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                    <button className="btn btn-ghost" style={{ flex: 1, padding: "0.4rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                    <a href={img.url} target="_blank" className="btn btn-ghost" style={{ flex: 1, padding: "0.4rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "center" }}>
                      <ExternalLink size={14} color="#fff" />
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ padding: "0.875rem" }}>
                <p style={{ fontSize: "0.8125rem", color: "#fff", fontWeight: 500, marginBottom: "0.25rem" }} className="line-clamp-1">{img.alt || "Untitled"}</p>
                <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }} className="line-clamp-1">Post: {img.postTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .image-card:hover { transform: translateY(-4px); border-color: rgba(255,49,49,0.3); }
        .image-card:hover .overlay { opacity: 1 !important; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

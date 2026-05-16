"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Search, Edit2, Trash2, Eye, Star, Loader2, Upload } from "lucide-react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/db";
import { formatNumber, formatDate } from "@/lib/utils";
import BulkUploadModal from "@/components/admin/BulkUploadModal";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return unsub;
  }, []);

  const filtered = posts.filter(p =>
    !searchQ || p.title?.toLowerCase().includes(searchQ.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (e) {
      console.error(e);
      alert("Error deleting post.");
    }
  };

  return (
    <div style={{ padding: "2rem", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)" }}>Posts</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{posts.length} total posts</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button 
            onClick={() => setIsBulkModalOpen(true)}
            className="btn btn-secondary" 
            style={{ border: "1px solid var(--border)" }}
          >
            <Upload size={16} /> Bulk Upload
          </button>
          <Link href="/admin/posts/create" className="btn btn-primary" style={{ textDecoration: "none" }}>
            <PlusCircle size={16} /> Create Post
          </Link>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
          <input type="text" placeholder="Search posts..." value={searchQ} onChange={e => setSearchQ(e.target.value)} className="input" style={{ paddingLeft: "2.5rem" }} />
        </div>
      </div>

      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "1rem 1.25rem", width: "40px" }}>
                <input type="checkbox" onChange={e => setSelectedIds(e.target.checked ? posts.map(p => p.id) : [])} checked={selectedIds.length > 0 && selectedIds.length === posts.length} style={{ cursor: "pointer" }} />
              </th>
              {["Post", "Category", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--text-tertiary)" }}><Loader2 size={24} className="animate-spin" style={{ margin: "0 auto" }} /></td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "var(--text-tertiary)" }}>No posts found.</td></tr>
            ) : filtered.map((post, i) => (
              <tr key={post.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <input type="checkbox" checked={selectedIds.includes(post.id)} onChange={() => toggleSelect(post.id)} style={{ cursor: "pointer" }} />
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img src={post.imageUrl || "https://via.placeholder.com/150"} alt={post.title} style={{ width: "48px", height: "36px", borderRadius: "8px", objectFit: "cover" }} />
                    <div>
                      <p className="line-clamp-1" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", maxWidth: "220px" }}>{post.title}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>/{post.slug}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{post.category}</span>
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                   <span className={`badge ${post.status === "published" ? "badge-success" : "badge-ghost"}`} style={{ fontSize: "0.7rem" }}>
                     {post.status === "published" ? "✓ Published" : "📝 Draft"}
                   </span>
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.375rem" }}>
                    <Link href={`/admin/posts/${post.id}/edit`} className="btn-icon">
                      <Edit2 size={13} />
                    </Link>
                    <Link href={`/prompt/${post.slug}`} target="_blank" className="btn-icon">
                      <Eye size={13} />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="btn-icon delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .btn-icon { width: 30px; height: 30px; border-radius: 7px; border: 1px solid var(--border); display: flex; alignItems: center; justifyContent: center; color: var(--text-secondary); text-decoration: none; transition: all 0.15s; background: transparent; cursor: pointer; }
        .btn-icon:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .btn-icon.delete { border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.06); color: #ef4444; }
        .btn-icon.delete:hover { background: #ef4444; color: #fff; }
      `}</style>
      
      <BulkUploadModal 
        isOpen={isBulkModalOpen} 
        onClose={() => setIsBulkModalOpen(false)} 
      />
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Eye, Loader2, Plus, X, Upload, ChevronLeft } from "lucide-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/db";
import { CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import Link from "next/link";

const AI_MODELS = ["Midjourney", "DALL-E 3", "Stable Diffusion", "ChatGPT", "Claude", "Gemini", "Other"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "prompt" | "seo" | "publish">("basic");
  
  const [form, setForm] = useState({
    title: "", slug: "", category: "", tags: [] as string[], tagInput: "",
    description: "", promptTitle: "", promptText: "", model: "Midjourney", difficulty: "Intermediate",
    seoTitle: "", seoDesc: "", status: "draft", isFeatured: false, isTrending: false,
    imageUrl: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm(prev => ({ ...prev, ...data }));
      } else {
        alert("Post not found!");
        router.push("/admin/posts");
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [id, router]);

  const update = (key: string, val: unknown) => setForm(p => ({ ...p, [key]: val }));

  const addTag = () => {
    const tag = form.tagInput.trim().replace(/^#/, "");
    if (tag && !form.tags.includes(tag)) {
      update("tags", [...form.tags, tag]);
    }
    update("tagInput", "");
  };

  const handleSave = async (status = form.status) => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "posts", id as string);
      await updateDoc(docRef, {
        ...form,
        status,
        updatedAt: new Date().toISOString(),
      });
      alert(`Post updated successfully! ✅`);
    } catch (e) {
      console.error(e);
      alert("Error updating post.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-tertiary)" }}>Loading post data...</div>;

  const TABS = ["basic", "prompt", "seo", "publish"] as const;
  const TAB_LABELS = { basic: "📋 Basic Info", prompt: "🤖 AI Prompt", seo: "🔍 SEO", publish: "🚀 Publish" };

  return (
    <div style={{ padding: "2rem", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
         <Link href="/admin/posts" style={{ color: "var(--text-tertiary)", display: "flex", alignItems: "center" }}>
           <ChevronLeft size={20} />
         </Link>
         <div>
           <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)" }}>Edit Post</h1>
           <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>ID: {id}</p>
         </div>
      </div>

      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "2rem", background: "var(--bg-secondary)", borderRadius: "12px", padding: "0.375rem", width: "fit-content" }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "9px", border: "none", background: activeTab === tab ? "var(--bg-elevated)" : "transparent", color: activeTab === tab ? "#fff" : "var(--text-secondary)", fontSize: "0.875rem", fontWeight: activeTab === tab ? 600 : 500, cursor: "pointer", transition: "all 0.2s" }}>
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "820px" }}>
        {activeTab === "basic" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label className="label">Title *</label>
                  <input type="text" value={form.title} onChange={e => update("title", e.target.value)} className="input" />
                </div>
                <div>
                  <label className="label">Slug *</label>
                  <input type="text" value={form.slug} onChange={e => update("slug", e.target.value)} className="input" />
                </div>
                <div>
                  <label className="label">Category *</label>
                  <select value={form.category} onChange={e => update("category", e.target.value)} className="input">
                    <option value="">Select category...</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.slug}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={5} className="input" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prompt" && (
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="label">Full Prompt Text</label>
                <textarea value={form.promptText} onChange={e => update("promptText", e.target.value)} rows={10} className="input" style={{ fontFamily: "monospace" }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "publish" && (
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
             <button onClick={() => handleSave()} disabled={isSaving} className="btn btn-primary" style={{ width: "100%" }}>
                {isSaving ? "Updating..." : "Save Changes"}
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

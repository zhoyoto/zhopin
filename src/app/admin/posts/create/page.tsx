"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Loader2, Plus, X, Upload } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { savePost } from "@/lib/db";

const AI_MODELS = ["Midjourney", "DALL-E 3", "Stable Diffusion", "ChatGPT", "Claude", "Gemini", "Other"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", slug: "", category: "", tags: [] as string[], tagInput: "",
    description: "", promptTitle: "", promptText: "", model: "Midjourney", difficulty: "Intermediate",
    seoTitle: "", seoDesc: "", status: "draft", isFeatured: false, isTrending: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "prompt" | "seo" | "publish">("basic");

  const update = (key: string, val: unknown) => setForm(p => ({ ...p, [key]: val }));

  const addTag = () => {
    const tag = form.tagInput.trim().replace(/^#/, "");
    if (tag && !form.tags.includes(tag)) {
      update("tags", [...form.tags, tag]);
    }
    update("tagInput", "");
  };

  const handleSave = async (status = "draft") => {
    if (!form.title || !form.category || !form.promptText) {
      alert("Please fill in required fields (Title, Category, Prompt Text)");
      return;
    }
    setIsSaving(true);
    try {
      await savePost({
        ...form,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      alert(`Post ${status === "published" ? "published" : "saved as draft"}! ✅`);
      router.push("/admin/posts");
    } catch (e) {
      console.error(e);
      alert("Error saving post.");
    } finally {
      setIsSaving(false);
    }
  };

  const TABS = ["basic", "prompt", "seo", "publish"] as const;
  const TAB_LABELS = { basic: "📋 Basic Info", prompt: "🤖 AI Prompt", seo: "🔍 SEO", publish: "🚀 Publish" };

  return (
    <div style={{ padding: "2rem", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>Create New Post</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Fill in the details to publish your inspiration</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={() => handleSave("draft")} className="btn btn-secondary" style={{ border: "1px solid var(--border)" }}>
            <Save size={15} /> Save Draft
          </button>
          <button onClick={() => handleSave("published")} disabled={isSaving} className="btn btn-primary">
            {isSaving ? <Loader2 size={15} style={{ animation: "rotate-slow 1s linear infinite" }} /> : <Eye size={15} />}
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "2rem", background: "var(--bg-secondary)", borderRadius: "12px", padding: "0.375rem", width: "fit-content" }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "9px", border: "none", background: activeTab === tab ? "var(--bg-elevated)" : "transparent", color: activeTab === tab ? "#fff" : "var(--text-secondary)", fontSize: "0.875rem", fontWeight: activeTab === tab ? 600 : 500, cursor: "pointer", transition: "all 0.2s" }}>
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "820px" }}>
        {/* Basic Info */}
        {activeTab === "basic" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>Basic Information</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Title *</label>
                  <input type="text" value={form.title} onChange={e => { update("title", e.target.value); update("slug", slugify(e.target.value)); update("seoTitle", e.target.value.slice(0, 60)); }}
                    placeholder="e.g. Cinematic AI Workspace Setup" className="input" maxLength={120} />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.25rem" }}>{form.title.length}/120 characters</p>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Slug *</label>
                  <input type="text" value={form.slug} onChange={e => update("slug", e.target.value)} placeholder="cinematic-ai-workspace-setup" className="input" />
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Category *</label>
                  <select value={form.category} onChange={e => update("category", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: form.category ? "#fff" : "var(--text-tertiary)", fontSize: "0.9375rem", outline: "none" }}>
                    <option value="">Select category...</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.slug}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Tags *</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input type="text" value={form.tagInput} onChange={e => update("tagInput", e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())}
                      placeholder="Add tag and press Enter..." className="input" />
                    <button type="button" onClick={addTag} className="btn btn-secondary" style={{ flexShrink: 0, border: "1px solid var(--border)" }}>
                      <Plus size={16} />
                    </button>
                  </div>
                  {form.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginTop: "0.625rem" }}>
                      {form.tags.map(tag => (
                        <span key={tag} className="tag-chip" style={{ cursor: "default" }}>
                          #{tag}
                          <button onClick={() => update("tags", form.tags.filter(t => t !== tag))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", marginLeft: "0.25rem", padding: 0 }}><X size={11} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Description *</label>
                  <textarea value={form.description} onChange={e => update("description", e.target.value)}
                    placeholder="Describe this inspiration in detail (min. 50 chars, max 5000)..."
                    rows={6} maxLength={5000}
                    style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", fontSize: "0.9375rem", resize: "vertical", outline: "none", fontFamily: "inherit", lineHeight: 1.6 }} />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.25rem" }}>{form.description.length}/5000 characters</p>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Featured Image & Gallery</h2>
              <div style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "12px", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,49,49,0.3)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}>
                <Upload size={28} color="var(--text-tertiary)" style={{ margin: "0 auto 0.75rem" }} />
                <p style={{ color: "#fff", fontWeight: 600, marginBottom: "0.25rem" }}>Drag & drop images here</p>
                <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginBottom: "1rem" }}>PNG, JPG, WebP up to 10MB · Up to 20 images</p>
                <button className="btn btn-secondary" style={{ border: "1px solid var(--border)" }}>
                  <Upload size={15} /> Browse Files
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prompt Tab */}
        {activeTab === "prompt" && (
          <div style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,49,49,0.2)", borderRadius: "16px", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>🤖 AI Prompt Details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Prompt Title</label>
                <input type="text" value={form.promptTitle} onChange={e => update("promptTitle", e.target.value)} placeholder="e.g. Cinematic Dark Workspace" className="input" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>AI Model</label>
                  <select value={form.model} onChange={e => update("model", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none" }}>
                    {AI_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Difficulty</label>
                  <select value={form.difficulty} onChange={e => update("difficulty", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none" }}>
                    {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Full Prompt Text *</label>
                <textarea value={form.promptText} onChange={e => update("promptText", e.target.value)}
                  placeholder="Enter the full AI prompt here... (min 50, max 2000 chars)"
                  rows={8} maxLength={2000}
                  style={{ width: "100%", padding: "0.875rem 1rem", background: "var(--bg-deep)", border: "1px solid var(--border)", borderRadius: "10px", color: "#b4b4c5", fontSize: "0.875rem", resize: "vertical", outline: "none", fontFamily: "var(--font-mono), 'JetBrains Mono', monospace", lineHeight: 1.7 }} />
                <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.25rem" }}>{form.promptText.length}/2000 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === "seo" && (
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>🔍 SEO Settings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Meta Title ({form.seoTitle.length}/60)</label>
                <input type="text" value={form.seoTitle} onChange={e => update("seoTitle", e.target.value)} placeholder="SEO title..." className="input" maxLength={60} />
                <div style={{ height: "4px", borderRadius: "2px", background: "var(--border)", marginTop: "0.375rem" }}>
                  <div style={{ height: "100%", borderRadius: "2px", width: `${(form.seoTitle.length / 60) * 100}%`, background: form.seoTitle.length > 55 ? "#ef4444" : "#10b981", transition: "all 0.2s" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Meta Description ({form.seoDesc.length}/160)</label>
                <textarea value={form.seoDesc} onChange={e => update("seoDesc", e.target.value)} placeholder="Describe this post for search engines..." rows={4} maxLength={160}
                  style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", fontSize: "0.9375rem", resize: "none", outline: "none", fontFamily: "inherit" }} />
              </div>
              {/* SEO Preview */}
              {(form.seoTitle || form.seoDesc) && (
                <div style={{ background: "var(--bg-deep)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Google Preview</p>
                  <p style={{ color: "#8ab4f8", fontSize: "1.0625rem", marginBottom: "0.25rem" }}>{form.seoTitle || "Post Title"}</p>
                  <p style={{ color: "#8a8a9e", fontSize: "0.8125rem" }}>https://promptnest.ai/prompt/{form.slug || "post-slug"}</p>
                  <p style={{ color: "#9aa0a6", fontSize: "0.875rem", marginTop: "0.25rem" }}>{form.seoDesc || "Meta description will appear here..."}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Publish Tab */}
        {activeTab === "publish" && (
          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem" }}>🚀 Publishing Options</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Status</label>
                <select value={form.status} onChange={e => update("status", e.target.value)}
                  style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "8px", color: "#fff", outline: "none" }}>
                  <option value="draft">📝 Draft</option>
                  <option value="published">✅ Published</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { key: "isFeatured", label: "⭐ Featured Post", desc: "Show in featured spotlight section" },
                  { key: "isTrending", label: "🔥 Trending Post", desc: "Mark as trending for increased visibility" },
                ].map(opt => (
                  <label key={opt.key} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "1rem", background: "var(--bg-secondary)", borderRadius: "12px", cursor: "pointer", border: "1px solid var(--border)" }}>
                    <input type="checkbox" checked={form[opt.key as "isFeatured" | "isTrending"]} onChange={e => update(opt.key, e.target.checked)}
                      style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                    <div>
                      <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem" }}>{opt.label}</p>
                      <p style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
                <button onClick={() => handleSave("draft")} className="btn btn-secondary" style={{ flex: 1, border: "1px solid var(--border)" }}>
                  <Save size={15} /> Save Draft
                </button>
                <button onClick={() => handleSave("published")} disabled={isSaving} className="btn btn-primary" style={{ flex: 1 }}>
                  {isSaving ? <Loader2 size={15} style={{ animation: "rotate-slow 1s linear infinite" }} /> : "🚀 Publish Now"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Layout, Save, X, Loader2 } from "lucide-react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/db";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", icon: "✨" });

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("name", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return unsub;
  }, []);

  const handleAdd = async () => {
    if (!newCat.name || !newCat.slug) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, "categories"), newCat);
      setNewCat({ name: "", slug: "", icon: "✨" });
      setShowAdd(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will not delete posts in this category.")) return;
    await deleteDoc(doc(db, "categories", id));
  };

  return (
    <div style={{ padding: "2rem", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)" }}>Categories</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage website categories and icons</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn btn-primary">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {showAdd && (
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>New Category</h2>
            <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}><X size={20} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.375rem" }}>Icon</label>
              <input type="text" value={newCat.icon} onChange={e => setNewCat(p => ({ ...p, icon: e.target.value }))} className="input" placeholder="✨" />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.375rem" }}>Name</label>
              <input type="text" value={newCat.name} onChange={e => setNewCat(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} className="input" placeholder="e.g. Anime Art" />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.375rem" }}>Slug</label>
              <input type="text" value={newCat.slug} onChange={e => setNewCat(p => ({ ...p, slug: e.target.value }))} className="input" placeholder="anime-art" />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button onClick={() => setShowAdd(false)} className="btn btn-secondary">Cancel</button>
            <button onClick={handleAdd} disabled={isSaving} className="btn btn-primary">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Category
            </button>
          </div>
        </div>
      )}

      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Icon", "Name", "Slug", "Actions"].map(h => (
                <th key={h} style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "var(--text-tertiary)" }}>Loading categories...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "var(--text-tertiary)" }}>No categories yet.</td></tr>
            ) : categories.map((cat, i) => (
              <tr key={cat.id} style={{ borderBottom: i < categories.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <td style={{ padding: "1rem 1.5rem", fontSize: "1.5rem" }}>{cat.icon}</td>
                <td style={{ padding: "1rem 1.5rem", color: "#fff", fontWeight: 600 }}>{cat.name}</td>
                <td style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)" }}>/{cat.slug}</td>
                <td style={{ padding: "1rem 1.5rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleDelete(cat.id)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ef4444" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

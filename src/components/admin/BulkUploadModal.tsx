"use client";

import React, { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { slugify, delay } from "@/lib/utils";
import Papa from "papaparse";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BulkUploadModal({ isOpen, onClose }: BulkUploadModalProps) {
  const { user: currentUser, isAdmin, loading: authLoading } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "parsing" | "uploading" | "completed" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid CSV file.");
      setFile(null);
    }
  };

  const parseCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, ""),
        complete: (results) => resolve(results.data),
        error: (err) => reject(err),
      });
    });
  };

  const handleUpload = async () => {
    if (!file) return;
    
    if (authLoading) return;
    if (!isAdmin || !currentUser) {
      setError("You must be logged in as an admin to perform bulk uploads.");
      setStatus("error");
      return;
    }

    try {
      setStatus("parsing");
      const rows = await parseCSVFile(file);
      
      if (rows.length === 0) {
        throw new Error("CSV file is empty or invalid. Required headers: title, category, prompttext.");
      }

      setTotal(rows.length);
      setStatus("uploading");
      setProgress(0);

      const postsRef = collection(db, "posts");
      const now = new Date().toISOString();

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        // Validation
        if (!row.title || !row.category || !row.prompttext) {
          throw new Error(`Row ${i + 1} failed: Missing required fields (title, category, or prompttext).`);
        }

        const title = row.title;
        const postData = {
          title: title,
          slug: row.slug || slugify(title) || `post-${Date.now()}-${i}`,
          description: row.description || "",
          seoTitle: row.seotitle || title.slice(0, 60),
          seoDescription: row.seodescription || (row.description ? row.description.slice(0, 160) : ""),
          featuredImage: {
            url: row.imageurl || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
            alt: title,
            width: 1200,
            height: 800
          },
          images: [],
          prompt: {
            title: title,
            text: row.prompttext,
            model: row.model || "Midjourney",
            difficulty: row.difficulty || "Beginner"
          },
          tags: row.tags ? row.tags.split(",").map((t: string) => t.trim()) : [],
          category: row.category,
          author: {
            uid: currentUser.uid,
            displayName: currentUser.displayName || "Admin",
            avatar: currentUser.photoURL || "https://api.dicebear.com/9.x/avataaars/svg?seed=admin",
            username: currentUser.email?.split("@")[0] || "admin"
          },
          stats: {
            views: 0,
            likes: 0,
            saves: 0,
            shares: 0,
            comments: 0
          },
          isFeatured: String(row.isfeatured).toLowerCase() === "true",
          isTrending: String(row.istrending).toLowerCase() === "true",
          status: row.status || "published",
          publishedAt: now,
          createdAt: now,
          updatedAt: now
        };

        try {
          await addDoc(postsRef, postData);
          await delay(100); 
        } catch (err: any) {
          console.error("FIREBASE ERROR:", err);
          throw new Error(`Row ${i + 1} failed: ${err.code} - ${err.message}`);
        }
        
        setProgress(i + 1);
      }

      setStatus("completed");
    } catch (err: any) {
      console.error("Bulk upload failed:", err);
      setError(err.message || "An error occurred during upload.");
      setStatus("error");
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      
      <div style={{ position: "relative", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", width: "100%", maxWidth: "500px", padding: "2rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}>
          <X size={20} />
        </button>

        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>Bulk Post Upload</h2>
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>Upload a CSV file to add multiple posts at once.</p>
        </div>

        {status === "idle" || status === "error" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{ border: "2px dashed var(--border)", borderRadius: "16px", padding: "2.5rem 1rem", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: file ? "rgba(255,49,49,0.05)" : "transparent", borderColor: file ? "#ff3131" : "var(--border)" }}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" style={{ display: "none" }} />
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: file ? "#ff3131" : "var(--text-tertiary)" }}>
                <Upload size={24} />
              </div>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>
                {file ? file.name : "Select CSV file"}
              </p>
              <p style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>
                {file ? `${(file.size / 1024).toFixed(1)} KB` : "Click to browse files"}
              </p>
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "10px", color: "#ef4444", fontSize: "0.875rem" }}>
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "1rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Required CSV Headers:</p>
              <code style={{ fontSize: "0.75rem", color: "var(--text-secondary)", wordBreak: "break-all" }}>
                title, slug, category, description, promptText, model, difficulty, imageUrl, tags
              </code>
            </div>

            <button 
              disabled={!file}
              onClick={handleUpload}
              className="btn btn-primary" 
              style={{ width: "100%", padding: "0.875rem", borderRadius: "12px", opacity: file ? 1 : 0.5 }}
            >
              Start Upload
            </button>
          </div>
        ) : (
          <div style={{ padding: "2rem 0", textAlign: "center" }}>
            {status === "completed" ? (
              <>
                <div style={{ color: "#10b981", marginBottom: "1.25rem" }}><CheckCircle2 size={48} style={{ margin: "0 auto" }} /></div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>Upload Successful!</h3>
                <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginBottom: "2rem" }}>{total} posts have been added to your database.</p>
                <button onClick={onClose} className="btn btn-secondary" style={{ width: "100%" }}>Close</button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "1.5rem" }}>
                  <Loader2 size={40} className="animate-spin" style={{ margin: "0 auto", color: "#ff3131" }} />
                </div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
                  {status === "parsing" ? "Analyzing CSV..." : `Uploading Posts...`}
                </h3>
                {status === "uploading" && (
                  <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                    <div style={{ height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", overflow: "hidden", marginBottom: "0.5rem" }}>
                      <div style={{ height: "100%", background: "#ff3131", width: `${(progress / total) * 100}%`, transition: "width 0.3s ease" }} />
                    </div>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
                      {progress} of {total} posts processed
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

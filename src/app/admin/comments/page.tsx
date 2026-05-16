"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Trash2, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import { formatNumber, formatDate } from "@/lib/utils";

export default function AdminComments() {
  const [comments, setComments] = useState<any[]>([
    { id: "1", author: "Alex M.", text: "Absolutely stunning prompts! The cinematic quality is incredible.", time: "2 days ago", postTitle: "Cyberpunk Cityscape", status: "approved" },
    { id: "2", author: "Sarah K.", text: "Used this for my portfolio shoot. Results were amazing!", time: "5 days ago", postTitle: "Neon Portraits", status: "pending" },
    { id: "3", author: "Mike R.", text: "Can you share the negative prompt for this one?", time: "1 week ago", postTitle: "Digital Abstract", status: "approved" },
  ]);

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), sans-serif" }}>
            Comments
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>Manage community discussions and moderate feedback.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
            <input type="text" placeholder="Search comments..." style={{ padding: "0.625rem 1rem 0.625rem 2.5rem", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "10px", color: "#fff", fontSize: "0.875rem", outline: "none", width: "240px" }} />
          </div>
          <button className="btn btn-secondary" style={{ padding: "0.625rem 1rem", border: "1px solid var(--border)" }}>
            <Filter size={16} /> All Status
          </button>
        </div>
      </div>

      <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
              {["Author", "Comment", "Post", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "1rem 1.5rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${comment.author}`} alt={comment.author} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff" }}>{comment.author}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{comment.time}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "1.25rem 1.5rem", maxWidth: "400px" }}>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{comment.text}</p>
                </td>
                <td style={{ padding: "1.25rem 1.5rem" }}>
                  <span style={{ fontSize: "0.8125rem", color: "#fff", fontWeight: 500 }}>{comment.postTitle}</span>
                </td>
                <td style={{ padding: "1.25rem 1.5rem" }}>
                  <span style={{ padding: "0.25rem 0.625rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600, background: comment.status === "approved" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: comment.status === "approved" ? "#10b981" : "#f59e0b" }}>
                    {comment.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {comment.status === "pending" && (
                      <button className="btn btn-ghost" style={{ padding: "0.4rem", color: "#10b981" }} title="Approve">
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button className="btn btn-ghost" style={{ padding: "0.4rem", color: "#ef4444" }} title="Delete">
                      <Trash2 size={18} />
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

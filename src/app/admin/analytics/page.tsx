"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight, ArrowDownRight, Globe, MousePointer2 } from "lucide-react";

export default function AdminAnalytics() {
  const stats = [
    { label: "Page Views", value: "24,592", change: "+12.5%", trending: "up" },
    { label: "Unique Visitors", value: "8,102", change: "+5.2%", trending: "up" },
    { label: "Avg. Session", value: "4m 32s", change: "-2.1%", trending: "down" },
    { label: "Bounce Rate", value: "42.3%", change: "+0.8%", trending: "down" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), sans-serif" }}>
          Analytics Overview
        </h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>Track platform performance and audience engagement metrics.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2rem" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "20px", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginBottom: "0.75rem" }}>{s.label}</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.value}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", fontWeight: 600, color: s.trending === "up" ? "#10b981" : "#ef4444", marginBottom: "0.2rem" }}>
                {s.trending === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Main Chart Placeholder */}
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "1.5rem", minHeight: "400px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>Traffic Trends</h3>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {["7D", "30D", "90D"].map(p => (
                <button key={p} style={{ padding: "0.375rem 0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: p === "30D" ? "rgba(255,255,255,0.08)" : "transparent", color: p === "30D" ? "#fff" : "var(--text-tertiary)", fontSize: "0.75rem", fontWeight: 600 }}>{p}</button>
              ))}
            </div>
          </div>
          {/* Mock Chart Visualization */}
          <div style={{ height: "280px", display: "flex", alignItems: "flex-end", gap: "1rem", padding: "0 1rem" }}>
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: "linear-gradient(to top, #ff3131 0%, #ff6b81 100%)", borderRadius: "4px 4px 0 0", opacity: 0.8 + (i * 0.02) }}></div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", padding: "0 0.5rem" }}>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
              <span key={m} style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Top Channels */}
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1.5rem" }}>Top Channels</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Direct Traffic", value: "45%", icon: <Globe size={16} />, color: "#ff3131" },
              { label: "Social Media", value: "30%", icon: <Users size={16} />, color: "#8b5cf6" },
              { label: "Search Engines", value: "15%", icon: <BarChart3 size={16} />, color: "#0ea5e9" },
              { label: "Referrals", value: "10%", icon: <MousePointer2 size={16} />, color: "#10b981" },
            ].map(c => (
              <div key={c.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ color: c.color }}>{c.icon}</div>
                    <span style={{ fontSize: "0.875rem", color: "#fff", fontWeight: 500 }}>{c.label}</span>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{c.value}</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ width: c.value, height: "100%", background: c.color, borderRadius: "10px" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

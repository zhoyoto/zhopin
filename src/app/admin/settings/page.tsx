"use client";

import React, { useState } from "react";
import { Settings, Save, Globe, Shield, Bell, Database, Mail, Link as LinkIcon } from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");

  const TABS = [
    { id: "general", label: "General", icon: <Globe size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "database", label: "Database", icon: <Database size={16} /> },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), sans-serif" }}>
            Settings
          </h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>Configure platform global variables and preferences.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem" }}>
        {/* Sidebar Tabs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", borderRadius: "12px", border: "1px solid", borderColor: activeTab === tab.id ? "rgba(255,49,49,0.3)" : "transparent", background: activeTab === tab.id ? "rgba(255,49,49,0.08)" : "transparent", color: activeTab === tab.id ? "#fff" : "var(--text-tertiary)", fontSize: "0.875rem", fontWeight: activeTab === tab.id ? 600 : 500, cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Area */}
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "2.5rem" }}>
          {activeTab === "general" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Globe size={18} color="#ff3131" /> Site Information
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>Site Name</label>
                    <input type="text" defaultValue="Clipshots Ai" style={{ padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "10px", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>Support Email</label>
                    <input type="email" defaultValue="support@clipshots.ai" style={{ padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "10px", color: "#fff", outline: "none" }} />
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <LinkIcon size={18} color="#ff3131" /> Social Connections
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { label: "Pinterest Verification", value: "0a208a03fc7e03d15b100af32fb61b75" },
                    { label: "Google AdSense ID", value: "ca-pub-2362880425680323" },
                  ].map(field => (
                    <div key={field.label} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>{field.label}</label>
                      <input type="text" defaultValue={field.value} style={{ padding: "0.75rem 1rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "10px", color: "#fff", outline: "none" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Shield size={18} color="#ff3131" /> Administrator Access
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>Master Admin Email</label>
                  <input type="email" defaultValue="zhoyotokoff@gmail.com" disabled style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text-tertiary)", outline: "none", cursor: "not-allowed" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "12px" }}>
                  <div style={{ color: "#ef4444" }}><Shield size={20} /></div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>Only whitelisted emails can access the admin panel. Any change requires manual database update for security.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "general" && activeTab !== "security" && (
            <div style={{ padding: "4rem", textAlign: "center" }}>
              <p style={{ color: "var(--text-tertiary)" }}>Section coming soon in the next update.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

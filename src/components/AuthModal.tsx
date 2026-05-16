"use client";

import React, { useState } from "react";
import { X, Mail, ArrowRight, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function AuthModal({ isOpen, onClose, title = "Join Clipshots Ai", subtitle = "Sign up to save and like your favorite inspirations." }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate easy signup
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.href = "/login"; // Redirect to login for now, or handle auth
      }, 2000);
    }, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div 
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }} 
        onClick={onClose}
      />
      <div 
        style={{ 
          position: "relative", 
          background: "var(--bg-elevated)", 
          border: "1px solid var(--border)", 
          borderRadius: "24px", 
          width: "100%", 
          maxWidth: "420px", 
          padding: "2.5rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          animation: "modalFadeIn 0.3s ease"
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(255,49,49,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", color: "#ff3131" }}>
            <Mail size={28} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{title}</h2>
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.9375rem", lineHeight: 1.5 }}>{subtitle}</p>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ color: "#10b981", fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.5rem" }}>Success!</div>
            <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem" }}>Redirecting you to complete your profile...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.875rem 1rem 0.875rem 2.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: "12px", color: "#fff", fontSize: "1rem", outline: "none" }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary" 
              style={{ padding: "0.875rem", borderRadius: "12px", fontSize: "1rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              {loading ? <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> : <>Continue <ArrowRight size={18} /></>}
            </button>
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textAlign: "center", marginTop: "0.5rem" }}>
              By continuing, you agree to our <a href="/terms-and-conditions" style={{ color: "var(--text-secondary)" }}>Terms</a> and <a href="/privacy-policy" style={{ color: "var(--text-secondary)" }}>Privacy Policy</a>.
            </p>
          </form>
        )}
      </div>
      <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

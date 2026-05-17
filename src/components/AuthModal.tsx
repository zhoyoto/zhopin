"use client";

import React, { useState } from "react";
import { X, Mail, ArrowRight, Loader2 } from "lucide-react";
import { 
  signInWithPopup, 
  sendSignInLinkToEmail
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function AuthModal({ isOpen, onClose, title = "Join Clipshots Ai", subtitle = "Sign up to save and like your favorite inspirations." }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setIsEmailSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send email link.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
      // Allow AuthProvider's onAuthStateChanged to pick it up and possibly sync user profile to firestore
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
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
          <p style={{ color: "var(--text-tertiary)", fontSize: "0.9375rem", lineHeight: 1.5 }}>
            {isEmailSent ? "Check your email for the magic link!" : subtitle}
          </p>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#ef4444", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {isEmailSent ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ color: "#10b981", fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.5rem" }}>Link Sent!</div>
            <p style={{ color: "var(--text-tertiary)", fontSize: "0.875rem", marginBottom: "1rem" }}>
              We sent a magic link to <strong>{email}</strong>. Click it to log in securely.
            </p>
            <button onClick={() => setIsEmailSent(false)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", textDecoration: "underline", cursor: "pointer", fontSize: "0.875rem" }}>
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="btn"
              style={{ width: "100%", padding: "0.875rem", borderRadius: "12px", fontSize: "1rem", marginBottom: "1rem", background: "#fff", color: "#000", border: "none" }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Continue with Google"}
            </button>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              <span style={{ padding: "0 1rem", color: "var(--text-tertiary)", fontSize: "0.875rem" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                disabled={loading || !email}
                className="btn btn-primary" 
                style={{ padding: "0.875rem", borderRadius: "12px", fontSize: "1rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <>Continue with Email <ArrowRight size={18} /></>}
              </button>
            </form>
          </>
        )}
        
        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textAlign: "center", marginTop: "1rem" }}>
          By continuing, you agree to our <a href="/terms-and-conditions" style={{ color: "var(--text-secondary)" }}>Terms</a> and <a href="/privacy-policy" style={{ color: "var(--text-secondary)" }}>Privacy Policy</a>.
        </p>
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
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

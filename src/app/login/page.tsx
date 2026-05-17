"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Zap, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      {/* Background blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", right: "20%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,49,49,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "15%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(30px)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #ff3131, #ff6b81)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 28px rgba(255,49,49,0.4)" }}>
              <Zap size={22} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "#fff" }}>
              Clip<span style={{ color: "#ff3131" }}>shot</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#fff", marginBottom: "0.375rem" }}>Sign In</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
            Welcome back! Please sign in to continue.
          </p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#ef4444", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn"
            style={{ width: "100%", padding: "0.875rem", fontSize: "1rem", marginBottom: "1.5rem", background: "#fff", color: "#000", border: "none" }}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Sign in with Google"}
          </button>

          <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ padding: "0 1rem", color: "var(--text-tertiary)", fontSize: "0.875rem" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Email</label>
              <div style={{ position: "relative" }}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input"
                  style={{ paddingLeft: "2.5rem" }}
                  required
                  autoComplete="email"
                />
                <Mail size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input"
                  style={{ paddingLeft: "2.5rem", paddingRight: "3rem" }}
                  required
                  autoComplete="current-password"
                />
                <Lock size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ padding: "0.875rem", fontSize: "1rem", marginTop: "0.5rem" }}
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8125rem", marginTop: "1.5rem" }}>
          Go back to{" "}
          <a href="/" style={{ color: "#ff6b81", textDecoration: "none" }}>homepage</a>
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

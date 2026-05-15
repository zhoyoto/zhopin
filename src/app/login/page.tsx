"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Globe, GitFork, Zap, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", right: "15%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,49,49,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(30px)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg, #ff3131, #ff6b81)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(255,49,49,0.4)" }}>
              <Zap size={20} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.375rem", color: "#fff" }}>
              Prompt<span style={{ color: "#ff3131" }}>Nest</span>
            </span>
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginTop: "1.5rem", marginBottom: "0.375rem" }}>Welcome back</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>Sign in to your account</p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "2rem" }}>
          {/* OAuth */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <button className="btn btn-secondary" style={{ padding: "0.75rem", border: "1px solid var(--border-hover)" }}>
              <Globe size={18} /> Google
            </button>
            <button className="btn btn-secondary" style={{ padding: "0.75rem", border: "1px solid var(--border-hover)" }}>
              <GitFork size={18} /> GitHub
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>or continue with email</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input" required />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                <label style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>Password</label>
                <Link href="/forgot-password" style={{ color: "#ff6b81", fontSize: "0.8125rem", textDecoration: "none" }}>Forgot password?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input" style={{ paddingRight: "3rem" }} required />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: "0.875rem", fontSize: "1rem", marginTop: "0.5rem" }}>
              {isLoading ? "Signing in..." : <><ArrowRight size={16} /> Sign In</>}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "1.5rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#ff6b81", textDecoration: "none", fontWeight: 600 }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

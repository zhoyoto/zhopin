"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Globe, GitFork, Zap, Check, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
  };

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["#ef4444", "#f59e0b", "#10b981"];
  const strengthLabels = ["Weak", "Good", "Strong"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,49,49,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg, #ff3131, #ff6b81)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(255,49,49,0.4)" }}>
              <Zap size={20} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.375rem", color: "#fff" }}>
              Prompt<span style={{ color: "#ff3131" }}>Nest</span>
            </span>
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginTop: "1.5rem", marginBottom: "0.375rem" }}>Create your account</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}>Join 50K+ AI creators today</p>
        </div>

        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "2rem" }}>
          {/* Perks */}
          <div style={{ background: "rgba(255,49,49,0.06)", border: "1px solid rgba(255,49,49,0.12)", borderRadius: "12px", padding: "0.875rem 1rem", marginBottom: "1.5rem" }}>
            {["Free forever — no credit card needed", "Unlimited saves & collections", "Access 500K+ AI prompts"].map(perk => (
              <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.8125rem", marginBottom: "0.375rem" }}>
                <Check size={13} color="#10b981" /> {perk}
              </div>
            ))}
          </div>

          {/* OAuth */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <button className="btn btn-secondary" style={{ padding: "0.75rem", border: "1px solid var(--border-hover)" }}><Globe size={18} /> Google</button>
            <button className="btn btn-secondary" style={{ padding: "0.75rem", border: "1px solid var(--border-hover)" }}><GitFork size={18} /> GitHub</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ color: "var(--text-tertiary)", fontSize: "0.8125rem" }}>or sign up with email</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Alex Designs" className="input" required />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="input" required />
            </div>
            <div>
              <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 characters" className="input" style={{ paddingRight: "3rem" }} required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.25rem" }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= pwStrength ? strengthColors[pwStrength - 1] : "var(--border)", transition: "all 0.2s" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: pwStrength > 0 ? strengthColors[pwStrength - 1] : "var(--text-tertiary)" }}>
                    {pwStrength > 0 ? strengthLabels[pwStrength - 1] : ""}
                  </span>
                </div>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: "0.875rem", fontSize: "1rem", marginTop: "0.5rem" }}>
              {isLoading ? "Creating account..." : <><ArrowRight size={16} /> Create Free Account</>}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8125rem", marginTop: "1.25rem" }}>
            By signing up you agree to our{" "}
            <Link href="/terms-and-conditions" style={{ color: "#ff6b81", textDecoration: "none" }}>Terms</Link> and{" "}
            <Link href="/privacy-policy" style={{ color: "#ff6b81", textDecoration: "none" }}>Privacy Policy</Link>.
          </p>

          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem", marginTop: "1rem" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#ff6b81", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

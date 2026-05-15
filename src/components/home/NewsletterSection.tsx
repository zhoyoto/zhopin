"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));

    setIsSubscribed(true);
    setIsSubmitting(false);
  };

  return (
    <section
      style={{
        padding: "0 0 4rem",
      }}
    >
      <div className="container-main">
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            padding: "3.5rem 2rem",
            textAlign: "center",
            border: "1px solid rgba(255,49,49,0.15)",
          }}
        >
          {/* Background */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,49,49,0.08) 0%, rgba(139,92,246,0.08) 100%)",
            }} />
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,49,49,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }} />
            {/* Grid */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }} />
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.875rem",
                borderRadius: "100px",
                background: "rgba(255,49,49,0.12)",
                border: "1px solid rgba(255,49,49,0.25)",
                marginBottom: "1.25rem",
              }}
            >
              <Mail size={13} color="#ff6b81" />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ff9eaa" }}>
                Weekly Newsletter
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.875rem",
                fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Get the Best AI Prompts<br />
              <span className="gradient-text">Delivered Weekly</span>
            </h2>

            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Join 50,000+ creators receiving curated AI prompts, trending setups,
              and exclusive inspiration every Tuesday.
            </p>

            {!isSubscribed ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  maxWidth: "440px",
                  margin: "0 auto",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, position: "relative", minWidth: "250px" }}>
                  <Mail
                    size={16}
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-tertiary)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    style={{
                      width: "100%",
                      padding: "0.875rem 1rem 0.875rem 2.75rem",
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "0.9375rem",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      if (!error) e.target.style.borderColor = "rgba(255,49,49,0.5)";
                    }}
                    onBlur={(e) => {
                      if (!error) e.target.style.borderColor = "rgba(255,255,255,0.1)";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ padding: "0.875rem 1.5rem", borderRadius: "12px", opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    <Loader2 size={16} style={{ animation: "rotate-slow 1s linear infinite" }} />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
                {error && (
                  <p style={{ color: "#ef4444", fontSize: "0.8125rem", width: "100%", textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.625rem",
                  padding: "1rem 2rem",
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  borderRadius: "12px",
                  maxWidth: "360px",
                  margin: "0 auto",
                  color: "#10b981",
                  fontWeight: 600,
                }}
              >
                <CheckCircle size={20} />
                You&apos;re in! Check your inbox 🎉
              </div>
            )}

            {/* Trust indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
              {[
                "✓ 50K+ subscribers",
                "✓ No spam, ever",
                "✓ Unsubscribe anytime",
              ].map((item) => (
                <span key={item} style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", fontWeight: 500 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import type { Metadata } from "next";
import { Zap, Heart, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Clipshots Ai",
  description: "Learn more about Clipshots Ai, the premium platform for AI inspirations.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", padding: "8rem 1.5rem 4rem" }}>
      <div className="container-main" style={{ maxWidth: "900px" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1.5rem", fontFamily: "var(--font-heading), sans-serif", letterSpacing: "-0.02em" }}>
            The Future of <span style={{ color: "#ff3131" }}>AI Inspiration</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "700px", margin: "0 auto" }}>
            Clipshots Ai is a community-driven platform designed to help creators discover, share, and monetize the most stunning AI-generated prompts and visuals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
          {[
            { icon: <Zap size={24} />, title: "Lightning Fast", text: "Optimized for speed and efficiency, helping you find inspiration in seconds." },
            { icon: <Heart size={24} />, title: "Community First", text: "Built for creators, by creators. We prioritize quality and engagement." },
            { icon: <Shield size={24} />, title: "Secure & Private", text: "Your data and prompts are protected with enterprise-grade security." },
            { icon: <Users size={24} />, title: "Global Network", text: "Connect with 50K+ AI enthusiasts and creators worldwide." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "2rem", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px" }}>
              <div style={{ color: "#ff3131", marginBottom: "1.25rem" }}>{item.icon}</div>
              <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>{item.title}</h3>
              <p style={{ color: "var(--text-tertiary)", lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(255,49,49,0.1) 0%, rgba(255,107,129,0.1) 100%)", padding: "3rem", borderRadius: "32px", border: "1px solid rgba(255,49,49,0.2)", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>Our Mission</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.8, maxWidth: "750px", margin: "0 auto" }}>
            We believe that AI is the most powerful tool for human creativity. Our mission is to bridge the gap between complex AI models and creative minds, providing a home for the best AI prompts on the web.
          </p>
          <div style={{ marginTop: "2rem", fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
            Clipshots Ai is proudly created by team <a href="https://crispo.xo.je/" target="_blank" rel="noopener noreferrer" style={{ color: "#ff3131", textDecoration: "none", fontWeight: 600 }}>crispo</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

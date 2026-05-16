"use client";

import Link from "next/link";
import { Rss, Zap, Heart } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const FOOTER_LINKS = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "https://wa.me/919947410627?text=Hi%2C%20I%20have%20an%20enquiry%20regarding%20Clipshots%20AI" },
    { label: "Blog", href: "#" },
  ],
  Product: [
    { label: "Trending", href: "/trending" },
    { label: "New Posts", href: "/new" },
    { label: "Search", href: "/search" },
    { label: "API Docs", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const SOCIAL_LINKS = [
  { icon: "𝕏", href: "#", label: "Twitter / X" },
  { icon: "📸", href: "#", label: "Instagram" },
  { icon: "👥", href: "#", label: "Facebook" },
  { icon: "🐙", href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-deep)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        marginTop: "4rem",
      }}
    >
      {/* Main Footer */}
      <div className="container-main" style={{ padding: "3rem 1.5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "2rem",
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ff3131 0%, #ff6b81 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={18} color="#fff" fill="#fff" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  color: "#fff",
                }}
              >
                Clipshots<span style={{ color: "#ff3131" }}> Ai</span>
              </span>
            </Link>
            <p
              style={{
                color: "var(--text-tertiary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                maxWidth: "280px",
                marginBottom: "1.5rem",
              }}
            >
              The premium platform for discovering, sharing, and monetizing AI
              prompts and inspirations. Join 50K+ creators worldwide.
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,49,49,0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,49,49,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#ff6b81";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-secondary)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "1rem",
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "var(--text-tertiary)",
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color =
                          "var(--text-tertiary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Top Categories */}
        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.75rem",
            }}
          >
            Top Categories
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.3125rem 0.75rem",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--text-tertiary)",
                  fontSize: "0.8125rem",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,49,49,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "#ff9eaa";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,49,49,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-tertiary)";
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              color: "var(--text-tertiary)",
              fontSize: "0.8125rem",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            © 2024 Clipshots Ai. Made with{" "}
            <Heart size={12} fill="#ff3131" color="#ff3131" /> for creators.
            <span style={{ marginLeft: "1rem", opacity: 0.8 }}>
              Created by team <a href="https://crispo.xo.je/" target="_blank" rel="noopener noreferrer" style={{ color: "#ff3131", textDecoration: "none", fontWeight: 600 }}>crispo</a>
            </span>
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <a
              href="/privacy-policy"
              style={{
                color: "var(--text-tertiary)",
                fontSize: "0.8125rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: "var(--text-tertiary)",
                fontSize: "0.8125rem",
                textDecoration: "none",
              }}
            >
              API Docs
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

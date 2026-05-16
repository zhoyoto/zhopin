"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Flame,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Trending", href: "/trending", icon: <TrendingUp size={16} /> },
  { label: "New", href: "/new", icon: <Sparkles size={16} /> },
  { label: "Explore", href: "/search", icon: <Flame size={16} /> },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      searchRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3"
            : "py-4"
        )}
        style={{
          background: isScrolled
            ? "rgba(18, 18, 24, 0.95)"
            : "rgba(11, 11, 15, 0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          boxShadow: isScrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="container-main">
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", flexShrink: 0 }}>
              <img src="/logo.png" alt="Clipshots Ai" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
              <span style={{
                fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}>
                Clipshots<span style={{ color: "#ff3131" }}> Ai</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.25rem" }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.5rem 0.875rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: pathname === link.href ? "#fff" : "var(--text-secondary)",
                    background: pathname === link.href ? "rgba(255,255,255,0.08)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== link.href) {
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      (e.target as HTMLElement).style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      (e.target as HTMLElement).style.background = "transparent";
                      (e.target as HTMLElement).style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.5rem 0.875rem",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Categories
                  <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: isCategoryMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                {isCategoryMenuOpen && (
                  <>
                    <div
                      style={{ position: "fixed", inset: 0, zIndex: 40 }}
                      onClick={() => setIsCategoryMenuOpen(false)}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        padding: "1rem",
                        width: "320px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.375rem",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                        zIndex: 50,
                        animation: "fadeInUp 0.2s ease",
                      }}
                    >
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          onClick={() => setIsCategoryMenuOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 0.625rem",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "var(--text-secondary)",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            transition: "all 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                            (e.currentTarget as HTMLElement).style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                          }}
                        >
                          <span style={{ fontSize: "1rem" }}>{cat.icon}</span>
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block" style={{ width: "280px" }}>
              <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search prompts, ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5625rem 1rem 0.5625rem 2.5rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,49,49,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,49,49,0.1)";
                    e.target.style.background = "rgba(255,255,255,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background = "rgba(255,255,255,0.06)";
                  }}
                />
              </form>
            </div>

            {/* Right Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Mobile Search */}
              <button
                className="lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s ease",
                }}
              >
                <Search size={16} />
              </button>



              {/* User Menu */}
              <div style={{ position: "relative" }} ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "2px solid rgba(255,49,49,0.3)",
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}
                >
                  <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=user" alt="User" style={{ width: "100%", height: "100%" }} />
                </button>

                {isUserMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border)",
                      borderRadius: "14px",
                      padding: "0.5rem",
                      width: "180px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                      zIndex: 100,
                    }}
                  >
                    <Link href="/login" style={{ display: "block", padding: "0.625rem 0.875rem", borderRadius: "8px", color: "#fff", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>Profile</Link>
                    <Link href="/admin" style={{ display: "block", padding: "0.625rem 0.875rem", borderRadius: "8px", color: "#fff", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>Admin Panel</Link>
                    <div style={{ height: "1px", background: "var(--border)", margin: "0.4rem 0" }} />
                    <button style={{ width: "100%", textAlign: "left", padding: "0.625rem 0.875rem", borderRadius: "8px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>Logout</button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                }}
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div style={{ marginTop: "0.75rem" }} className="lg:hidden">
              <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search prompts, ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input"
                  style={{ paddingLeft: "2.5rem" }}
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              padding: "1rem",
              background: "rgba(18, 18, 24, 0.98)",
              backdropFilter: "blur(20px)",
            }}
            className="md:hidden"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: pathname === link.href ? "#fff" : "var(--text-secondary)",
                    fontWeight: 500,
                    background: pathname === link.href ? "rgba(255,255,255,0.08)" : "transparent",
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div style={{ height: "73px" }} />
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Images, MessageSquare, BarChart3, Settings, Shield, Zap, PlusCircle, LogOut } from "lucide-react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { useAuth } from "@/context/AuthProvider";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={17} /> },
  { label: "Posts", href: "/admin/posts", icon: <FileText size={17} /> },
  { label: "Images", href: "/admin/images", icon: <Images size={17} /> },
  { label: "Comments", href: "/admin/comments", icon: <MessageSquare size={17} /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 size={17} /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings size={17} /> },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside style={{ width: "240px", background: "var(--bg-secondary)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100, flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "1.25rem 1.25rem 1rem", borderBottom: "1px solid var(--border)" }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <img src="/logo.png" alt="Logo" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
          <div>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>Clipshots Ai</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.6875rem", color: "#ff6b81", fontWeight: 600 }}>
              <Shield size={9} /> ADMIN
            </span>
          </div>
        </Link>
      </div>

      {/* Quick action */}
      <div style={{ padding: "0.875rem 1rem" }}>
        <Link href="/admin/posts/create" className="btn btn-primary" style={{ width: "100%", textDecoration: "none", justifyContent: "center", padding: "0.625rem", fontSize: "0.875rem" }}>
          <PlusCircle size={15} /> New Post
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {NAV.map(item => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem 0.75rem", borderRadius: "10px", textDecoration: "none", color: isActive ? "#fff" : "var(--text-secondary)", background: isActive ? "rgba(255,255,255,0.08)" : "transparent", fontWeight: isActive ? 600 : 500, fontSize: "0.875rem", transition: "all 0.15s", position: "relative" }}>
              {item.icon}
              <span style={{ flex: 1 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "0.875rem 1rem", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.75rem" }}>
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=admin" alt="Admin" style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(255,49,49,0.3)" }} />
          <div>
            <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#fff" }}>Admin</p>
            <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>zhoyotokoff@gmail.com</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link href="/" className="btn btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "0.4rem", fontSize: "0.8125rem", border: "1px solid var(--border)", textDecoration: "none" }}>
            View Site
          </Link>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: "0.4rem 0.625rem", border: "1px solid var(--border)", color: "#ef4444" }} title="Sign out">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-deep)" }}>
        <AdminSidebar />
        <main style={{ flex: 1, marginLeft: "240px", minHeight: "100vh" }}>
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}

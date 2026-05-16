"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/login-admin");
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-deep)" }}>
        <Loader2 size={32} style={{ animation: "spin 1s linear infinite", color: "#ff3131" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}

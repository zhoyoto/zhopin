"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { onAdminAuthChange } from "@/lib/auth";
import type { User } from "firebase/auth";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAdminAuthChange((u) => {
      setUser(u);
      if (u === null) {
        router.replace("/login-admin");
      }
    });
    return unsub;
  }, [router]);

  if (user === undefined) {
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

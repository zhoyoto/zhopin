"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

interface Props {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: Props) {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/login");
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-[#0A0A0A]">
        <div className="w-8 h-8 border-4 border-[#ff3131] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return <>{children}</>;
}
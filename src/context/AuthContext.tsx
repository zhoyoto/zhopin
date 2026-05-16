"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { auth, isAdminEmail } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Sync token to cookie
          const idToken = await user.getIdToken();
          await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });
          
          setUser(user);
          setIsAdmin(isAdminEmail(user.email));
        } catch (error) {
          console.error("Error syncing auth state:", error);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        // Clear cookie
        await fetch("/api/logout", { method: "POST" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (!isAdminEmail(result.user.email)) {
      await firebaseSignOut(auth);
      throw new Error("Access denied. Admin only.");
    }
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login-admin";
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "zhoyotokoff@gmail.com";

interface UserProfile {
  uid: string;
  displayName: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: any;
  wishlist: string[];
  following: string[];
  savedPosts: string[];
  likedPosts: string[];
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            // Create user profile
            const newProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || currentUser.email?.split("@")[0] || "User",
              username: currentUser.email?.split("@")[0] || `user${Math.floor(Math.random() * 10000)}`,
              email: currentUser.email || "",
              avatar: currentUser.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${currentUser.uid}`,
              createdAt: serverTimestamp(),
              wishlist: [],
              following: [],
              savedPosts: [],
              likedPosts: [],
              isAdmin: currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
            };
            
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile as any);
          } else {
            setProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error("Error fetching/creating user profile:", error);
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true);
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
    router.push("/");
  };

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || profile?.isAdmin === true;

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

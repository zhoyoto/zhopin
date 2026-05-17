import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { type Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ─── Config ──────────────────────────────────────────────────────────────────
// Values come from .env.local via NEXT_PUBLIC_ prefix

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ─── Singleton initialisation ─────────────────────────────────────────────────
export const firebaseApp: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const auth = getAuth(firebaseApp);

// Initialize persistence
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Auth persistence error:", error);
  });
}

export const googleProvider = new GoogleAuthProvider();

// ─── Firestore ────────────────────────────────────────────────────────────────
export const db = getFirestore(firebaseApp);

// ─── Analytics (client-only) ──────────────────────────────────────────────────
let analyticsInstance: Analytics | null = null;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (analyticsInstance) return analyticsInstance;

  const { getAnalytics, isSupported } = await import("firebase/analytics");
  const supported = await isSupported();
  if (!supported) return null;

  analyticsInstance = getAnalytics(firebaseApp);
  return analyticsInstance;
}

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { type Analytics } from "firebase/analytics";

// ─── Config ──────────────────────────────────────────────────────────────────
// Values come from .env.local via NEXT_PUBLIC_ prefix (safe to expose in
// browser bundles — Firebase API keys are not secrets; they identify the
// project. Actual security is enforced by Firebase Security Rules).

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
// getApps() prevents "Firebase: Firebase App named '[DEFAULT]' already exists"
// errors that occur with Next.js hot-reloads and module re-evaluation.

export const firebaseApp: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ─── Analytics (client-only) ──────────────────────────────────────────────────
// Analytics uses browser APIs (window, navigator) so it must never run on the
// server. We lazy-load it behind a typeof window guard.

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

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);

// ─── Admin whitelist ──────────────────────────────────────────────────────────
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "zhoyotokoff@gmail.com";

export function isAdminEmail(email: string | null | undefined): boolean {
  return email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// ─── Sign in / out ────────────────────────────────────────────────────────────
export async function signInAdmin(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (!isAdminEmail(result.user.email)) {
    await firebaseSignOut(auth);
    throw new Error("Access denied. This panel is for administrators only.");
  }
  return result.user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

// ─── Subscribe to auth state ──────────────────────────────────────────────────
export function onAdminAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(isAdminEmail(user?.email) ? user : null);
  });
}

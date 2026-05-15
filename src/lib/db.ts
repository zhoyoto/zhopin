import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { firebaseApp } from "./firebase";

export const db = getFirestore(firebaseApp);

// ─── Posts ────────────────────────────────────────────────────────────────────
export async function savePost(data: DocumentData): Promise<string> {
  const ref = await addDoc(collection(db, "posts"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

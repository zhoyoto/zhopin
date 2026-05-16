import * as admin from "firebase-admin";

const getPrivateKey = () => {
  const b64Key = process.env.FIREBASE_PRIVATE_KEY_B64;
  if (b64Key) {
    try {
      return Buffer.from(b64Key, "base64").toString("utf8");
    } catch (e) {
      console.error("Failed to decode Base64 key:", e);
    }
  }
  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\"/g, "").replace(/\\n/g, "\n");
};

function getAdminApp() {
  if (!admin.apps.length) {
    const privateKey = getPrivateKey();
    if (!privateKey) {
      console.warn("FIREBASE_PRIVATE_KEY is missing or invalid.");
    }

    const firebaseAdminConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    };

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
  }
  return admin.apps[0]!;
}

// Ensure app is initialized before services
const app = getAdminApp();

export const adminAuth = admin.auth(app);
export const adminDb = admin.firestore(app);

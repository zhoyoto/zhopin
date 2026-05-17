import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

let adminAuth: any;

if (
projectId &&
clientEmail &&
privateKey
) {
const app =
getApps().length > 0
? getApps()[0]
: initializeApp({
credential: cert({
projectId,
clientEmail,
privateKey: privateKey.replace(/\n/g, "\n"),
}),
});

adminAuth = getAuth(app);
} else {
console.error(
"Firebase Admin environment variables are missing."
);
}

export { adminAuth };

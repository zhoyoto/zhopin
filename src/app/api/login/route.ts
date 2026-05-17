import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
try {
if (!adminAuth) {
return NextResponse.json(
{ error: "Firebase Admin not initialized" },
{ status: 500 }
);
}

const { idToken } = await req.json();

const expiresIn =
  60 * 60 * 24 * 5 * 1000;

const sessionCookie =
  await adminAuth.createSessionCookie(
    idToken,
    { expiresIn }
  );

const response = NextResponse.json({
  success: true,
});

response.cookies.set(
  "session",
  sessionCookie,
  {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: expiresIn / 1000,
    path: "/",
  }
);

return response;
} catch (error: any) {
console.error(error);

return NextResponse.json(
  {
    error: error.message,
  },
  { status: 500 }
);
}
}

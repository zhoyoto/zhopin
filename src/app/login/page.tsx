"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Zap, Loader2, ArrowRight } from "lucide-react";
import { 
  signInWithPopup, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is returning from an email link
    const handleEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let storedEmail = window.localStorage.getItem("emailForSignIn");
        if (!storedEmail) {
          storedEmail = window.prompt("Please provide your email for confirmation");
        }
        
        if (storedEmail) {
          setIsLoading(true);
          try {
            await signInWithEmailLink(auth, storedEmail, window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            router.push("/admin");
          } catch (err: any) {
            setError(err.message || "Failed to sign in with email link.");
          } finally {
            setIsLoading(false);
          }
        }
      }
    };
    
    handleEmailLink();
  }, [router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setIsEmailSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send email link.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", right: "20%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,49,49,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "15%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(30px)" }} />
      </div>

      <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #ff3131, #ff6b81)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 28px rgba(255,49,49,0.4)" }}>
              <Zap size={22} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "#fff" }}>
              Clip<span style={{ color: "#ff3131" }}>shot</span>
            </span>
          </div>
        </div>

        <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "24px", padding: "2rem" }}>
          <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#fff", marginBottom: "0.375rem" }}>Sign In</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
            {isEmailSent ? "Check your email for the magic link!" : "Welcome back! Sign in to continue."}
          </p>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#ef4444", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}

          {!isEmailSent && (
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="btn"
              style={{ width: "100%", padding: "0.875rem", fontSize: "1rem", marginBottom: "1.5rem", background: "#fff", color: "#000", border: "none" }}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Continue with Google"}
            </button>
          )}

          {!isEmailSent && (
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              <span style={{ padding: "0 1rem", color: "var(--text-tertiary)", fontSize: "0.875rem" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>
          )}

          {isEmailSent ? (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <Mail size={48} style={{ margin: "0 auto", color: "#10b981", marginBottom: "1rem" }} />
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
                We sent a magic link to <strong>{email}</strong>. Click it to log in securely.
              </p>
              <button onClick={() => setIsEmailSent(false)} style={{ background: "none", border: "none", color: "var(--text-tertiary)", textDecoration: "underline", cursor: "pointer", fontSize: "0.875rem" }}>
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.375rem" }}>Email</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input"
                    style={{ paddingLeft: "2.5rem" }}
                    required
                    autoComplete="email"
                  />
                  <Mail size={16} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="btn btn-primary"
                style={{ padding: "0.875rem", fontSize: "1rem", marginTop: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>Continue with Email <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: "center", color: "var(--text-tertiary)", fontSize: "0.8125rem", marginTop: "1.5rem" }}>
          Go back to{" "}
          <a href="/" style={{ color: "#ff6b81", textDecoration: "none" }}>homepage</a>
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Clipshots Ai",
  description: "Learn about how Clipshots Ai uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", padding: "8rem 1.5rem 4rem" }}>
      <div className="container-main" style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#fff", marginBottom: "2rem", fontFamily: "var(--font-heading), sans-serif" }}>
          Cookie Policy
        </h1>
        
        <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <p>Last updated: May 16, 2026</p>
          
          <section>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>1. What Are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>2. How We Use Cookies</h2>
            <p>Clipshots Ai uses cookies for several purposes, including:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
              <li><strong>Essential Cookies:</strong> Necessary for the website to function, such as authentication and security.</li>
              <li><strong>Preference Cookies:</strong> To remember your settings and preferences.</li>
              <li><strong>Analytics Cookies:</strong> To understand how visitors interact with our website (e.g., Microsoft Clarity).</li>
              <li><strong>Advertising Cookies:</strong> To show you relevant ads through Google AdSense.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>3. Managing Cookies</h2>
            <p>Most web browsers allow you to control cookies through their settings. You can choose to block or delete cookies, but this may affect your ability to use certain features of our website.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>4. Changes to This Policy</h2>
            <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "1rem" }}>5. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us via WhatsApp or through our support channels.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

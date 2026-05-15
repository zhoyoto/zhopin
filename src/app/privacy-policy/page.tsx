import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | PromptNest AI", description: "PromptNest AI privacy policy - how we collect, use, and protect your data." };

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", padding: "4rem 0" }}>
      <div className="container-main" style={{ maxWidth: "760px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>Privacy Policy</h1>
        <p style={{ color: "var(--text-tertiary)", marginBottom: "3rem" }}>Last updated: September 14, 2024</p>
        {[
          { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, profile data) and automatically (usage data, cookies, device info). We use Firebase Authentication and Firestore for secure data storage." },
          { title: "2. How We Use Your Data", content: "We use your data to provide and improve our services, personalize your experience, send newsletters (with consent), and for analytics. We never sell your personal data to third parties." },
          { title: "3. Cookies", content: "We use essential cookies for authentication, preference cookies for your settings, and analytics cookies to understand usage. See our Cookie Policy for details." },
          { title: "4. Data Security", content: "We implement industry-standard security measures including encryption, secure HTTPS connections, and regular security audits. Firebase provides enterprise-grade security for all data." },
          { title: "5. Your Rights (GDPR)", content: "You have the right to access, correct, delete, and export your data. Contact us at privacy@promptnest.ai to exercise these rights. We respond within 30 days." },
          { title: "6. Third-Party Services", content: "We use Google Analytics, Firebase, Cloudinary, and Google AdSense. Each has their own privacy policy. We ensure all partners are GDPR compliant." },
          { title: "7. Contact Us", content: "For privacy questions, contact us at privacy@promptnest.ai or through our Contact page. We take all privacy concerns seriously." },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#fff", marginBottom: "0.625rem" }}>{section.title}</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

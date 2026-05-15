import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms & Conditions | PromptNest AI", description: "PromptNest AI terms of service and conditions of use." };

export default function TermsPage() {
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", padding: "4rem 0" }}>
      <div className="container-main" style={{ maxWidth: "760px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>Terms & Conditions</h1>
        <p style={{ color: "var(--text-tertiary)", marginBottom: "3rem" }}>Last updated: September 14, 2024</p>
        {[
          { title: "1. Acceptance of Terms", content: "By accessing and using PromptNest AI, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform." },
          { title: "2. User Accounts", content: "You must be 13+ to create an account. You are responsible for maintaining account security. Admin access is restricted to authorized personnel only." },
          { title: "3. Content Ownership", content: "You retain ownership of content you create and upload. By posting, you grant PromptNest AI a non-exclusive license to display and distribute your content on the platform." },
          { title: "4. Prohibited Content", content: "You may not post harmful, illegal, or infringing content. AI-generated content must be ethically created. Spam, harassment, and copyright violations are prohibited." },
          { title: "5. Monetization", content: "Creator monetization features are subject to additional terms. Platform takes 30% commission on premium prompt sales. Payouts require a minimum $50 balance." },
          { title: "6. Termination", content: "We reserve the right to suspend or terminate accounts that violate these terms. Users may delete their accounts at any time through account settings." },
          { title: "7. Limitation of Liability", content: "PromptNest AI is provided 'as is'. We are not liable for user-generated content or indirect damages. Our total liability is limited to fees paid in the past 12 months." },
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

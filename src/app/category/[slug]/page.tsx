import { CATEGORIES, MOCK_POSTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import InspirationCard from "@/components/cards/InspirationCard";
import type { Metadata } from "next";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} – AI Inspirations | PromptNest AI`,
    description: `Explore ${cat.postCount}+ ${cat.name} AI prompts and inspirations on PromptNest AI. Discover ${cat.description.toLowerCase()}.`,
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = MOCK_POSTS.filter((p) => p.category.slug === slug);

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "3rem 0" }}>
        <div className="container-main">
          <nav style={{ display: "flex", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "1.25rem" }}>
            <Link href="/" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "var(--text-secondary)" }}>{category.name}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: `${category.color}20`, border: `1px solid ${category.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
              {category.icon}
            </div>
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading), 'Space Grotesk', sans-serif" }}>
                {category.name}
              </h1>
              <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                {category.description} · {category.postCount.toLocaleString()} posts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container-main" style={{ paddingTop: "2.5rem" }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>No posts yet</h3>
            <p style={{ color: "var(--text-secondary)" }}>Be the first to post in {category.name}!</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {posts.map((post) => <InspirationCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  );
}
